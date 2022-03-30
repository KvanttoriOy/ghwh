# @kvanttori/ghwh

A minimal express server that executes shell commands based on GitHub webhooks.

🚧 This package is in its alpha stage, so don't expect it to work flawlessly.

## Quick start

The absolute quickest way to run the server is by running `npx @kvanttori/ghwh` in a folder. This way you don't need to install the dependencies and compile the server before launch.
You can still configure the server by creating a `ghwh.config.json` file in the folder where you run the `npx @kvanttori/ghwh` command, same as in the [Configuration](#configuration) section.

## Configuration

The server uses the following default configuration:

```jsonc
{
  // listen to requests on port 8080
  "port": 8080,

  // listen to requests on http://localhost:8080/
  "route": "/",

  // execute commands in the current folder (relative to the githook server or where you ran `npx ghwh`)
  // You can put relative and absolute paths here
  "folder": "./",

  // only execute commands if push was to 'master' branch
  "branch": "master",

  // Secret value configured in the GitHub webhook (use "" to disable validation)
  "secret": "changeme",

  // commands to execute (in order) when a webhook is received
  "commands": ["git pull", "npm i", "npm run build", "npm start"]
}
```

You can override individual settings by creating a JSON file at the repository root called `ghwh.config.json`, containing the fields that you want to override:

```jsonc
// ghwh.config.json
{
  "folder": "/home/my-user/my-repo", // custom folder
  "secret": "my-secret", // Secret value to use for verification
  "commands": ["git pull", "npm start"] // do these commands instead of the default ones
}
```

### GitHub webhook

The GitHub webhook should have `application/json` as its content type. With the configurations defined above, and an example IP of `localhost`, the GitHub webhook URL should look like this: `http://localhost:8080/`, and the secret should be `mysecret`.

## Notes

If you're running `git pull` as a command, make sure that git has the credentials saved so that it won't ask for them every time. You can make Git store the username and password with the following command: `git config --global credential.helper store`. Note that you'll need to input the credentials once after this command to save them.

## Development

First install the dependencies and build the server:

- `npm i`

And to start the server in dev mode, simply run `npm run dev`.

To build a production version, simply run `npm run build`.
This will create a `dist` folder with the built server inside, which can be run with `npm start`
