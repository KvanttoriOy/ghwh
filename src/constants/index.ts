import { Config } from "../types/config"

// must match the one in package.json
export const VERSION = "0.2.3"

export const CONFIG_FILE_NAME = "ghwh.config.json"

export const DEFAULT_CONFIG: Config = {
  port: 8080,
  route: "/",
  folder: "./",
  branch: "master",
  secret: "changeme",
  commands: ["git pull"],
}
