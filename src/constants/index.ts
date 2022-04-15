import { Config } from "../types/config"

// must match the one in package.json
export const VERSION = "0.3.1"

export const CONFIG_FILE_NAME = "huukki.yaml"

export const DEFAULT_CONFIG: Config = {
  server: {
    port: 8080,
    route: "/",
    secret: "changeme",
  },
  branch: {
    master: {
      dir: "./",
      commands: ["git pull"],
    },
  },
}

export const EXECUTION_FOLDER = process.env.INIT_CWD ?? process.env.PWD ?? process.cwd()
