# GHWH

A minimal express server that listens to GitHub webhooks and executes a sequence of commands.

Run it using `npx ghwh`, or by cloning the repository, building it and running it.

🚧 This package is in its alpha stage, so don't expect it to work flawlessly.

## Quick start `npx`

The absolute quickest way to run the server is by running `npx ghwh` in a folder. This way you don't need to install the dependencies and compile the server before launch.
You can still configure the server by creating a `ghwh.config.json` file in the folder where you run `npx ghwh`, same as in the [Configuration](#configuration) section.

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

  // use no secret validation with the webhook (unsafe)
  "secret": "",

  // commands to execute (in order) when a webhook is received
  "commands": ["git pull", "npm i", "npm run build", "npm start"]
}
```

You can override individual settings by creating a JSON file at the repository root called `ghwh.config.json`, containing the fields that you want to override:

```jsonc
// ghwh.config.json
{
  "folder": "/home/my-user/my-repo", // custom folder
  "secret": "mysecret", // use a secret
  "commands": ["git pull", "npm start"] // do these commands instead of the default ones
}
```

## Development

First install the dependencies and build the server:

- `npm i`

And to start the server in dev mode, simply run `npm run dev`.

To build a production version, simply run `npm run build`.
This will create a `dist` folder with the built server inside, which can be run with `npm start`
