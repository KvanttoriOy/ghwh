# @kvanttori/huukki

A minimal express server that executes shell commands based on GitHub webhooks.

🚧 This package is in its alpha stage, so don't expect it to work flawlessly.

## Quick start

The absolute quickest way to run the server is by using `npx`. This way you don't need to clone the repository, install dependencies and build the project manually. Simply run the correct npx command in the folder where you want to run the server.

### Run the server as a daemon (recommended)

```bash
npx @kvanttori/huukki --daemon
```

or

```bash
npx @kvanttori/huukki --daemon=start
```

This will run the server as a [PM2](https://pm2.keymetrics.io/) background process under the name `huukki`. This means the server will automatically restart upon crash.

You can access the logs for the server by installing `pm2` globally and running `pm2 logs` or `pm2 logs huukki`

### Stop the daemon server

`npx @kvanttori/huukki --daemon=stop`

This stops the PM2 process.

### Run the server as a normal node process

`npx @kvanttori/huukki`

This will launch the server as a normal `node` process, if you don't want to use PM2 (although it is highly recommended).

## Configuration

The server uses the following default configuration:

```jsonc
{
  // listen to requests on port 8080
  "port": 8080,

  // What path to mount the webhook listener route. This must be a relative path.
  // Example: "/webhook" -> "http://localhost:8080/webhook"
  "route": "/",

  // execute commands in the current folder (relative to where you ran `npx @kvanttori/huukki`)
  // You can put both relative and absolute paths here (e.g. "../" and "/home/user/my-folder")
  "folder": "./",

  // only execute commands if push was to 'master' branch
  "branch": "master",

  // Secret value configured in the GitHub webhook (use "" to disable validation)
  "secret": "changeme",

  // commands to execute (in order) when a webhook is received
  "commands": ["git pull"]
}
```

You can override individual settings by creating a JSON file called `huukki.config.json` in the folder where you run the npx command.

The file should contain the fields that you want to override, fields that you leave out will use the values defined in the default config above.

```jsonc
// huukki.config.json
{
  "folder": "/home/my-user/my-repo",
  "secret": "ultra-secret-secret",
  "commands": ["git pull", "npm i", "npm run build", "pm2 reload all"]
}
```

The resulting config would look like this:

```jsonc
{
  "port": 8080,
  "route": "/webhook",
  "folder": "/home/my-user/my-repo",
  "branch": "master",
  "secret": "ultra-secret-secret",
  "commands": ["git pull", "npm i", "npm run build", "pm2 reload all"]
}
```

### GitHub webhook

The GitHub webhook **must** have `application/json` as its content type. With the configurations defined above, and an example IP of `localhost`, the GitHub webhook URL should look like this: `http://localhost:8080/webhook`, and the webhook's secret should be `ultra-secret-secret`.

## Notes

- If you're running `git pull` as a command, make sure that git has the credentials saved so that it won't ask for them every time. You can make Git store the username and password with the following command: `git config --global credential.helper store`. Note that you'll need to input the credentials once after this command to save them.

- you cannot change directory within the commands currently, because each command is executed as a separate process.

## Development

First install the dependencies and build the server:

- `npm i`

And to start the server in dev mode, simply run `npm run dev`.

To build a production version, simply run `npm run build`.
This will create a `dist` folder with the built server inside, which can be run with `npm start`
