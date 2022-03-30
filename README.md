# Gook Server

A minimal express server that listens to GitHub webhooks and executes a sequence of commands.

Run it using `npx gook-server`, or by cloning the repository, building it and running it.

## Getting started

First install the dependencies and build the server:

- `npm i`
- `npm run build`

And to start the server from now on, simply run `npm start`.

## Configuration

The server uses the following default configuration:

```jsonc
{
  // listen to requests on port 8080
  "port": 8080,

  // listen to requests on http://localhost:8080/
  "route": "/",

  // execute commands in the current folder (relative to the githook server or where you ran `npx gook-server`)
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

You can override individual settings by creating a JSON file at the repository root called `gook.config.json`, containing the fields that you want to override:

```jsonc
// gook.config.json
{
  "folder": "/home/my-user/my-repo", // custom folder
  "secret": "mysecret", // use a secret
  "commands": ["git pull", "npm start"] // do these commands instead of the default ones
}
```

## Run using `npx`

The absolute quickest way to run gook-server is by running `npx gook-server` in a folder. This way you don't need to install the dependencies and compile the server before launch.
You can still configure the server by creating a `gook.config.json` file in the folder where you run `npx gook-server`, same as in the [Configuration](#configuration) section.
