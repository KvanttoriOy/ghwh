import { Config } from "../types/config"

// must match the one in package.json
export const VERSION = "0.2.10"

export const CONFIG_FILE_NAME = "huukki.config.json"

export const DEFAULT_CONFIG: Config = {
  port: 8080,
  route: "/",
  folder: "./",
  branch: "master",
  secret: "changeme",
  commands: ["git pull"],
}

export const EXECUTION_FOLDER = process.env.INIT_CWD ?? process.env.PWD ?? process.cwd()
