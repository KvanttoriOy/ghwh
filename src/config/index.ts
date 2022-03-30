import { Config } from "@/types/config"
import { readFile } from "fs/promises"
import path from "path"

const CONFIG_FILE_NAME = "ghwh.config.json"

const DEFAULT_CONFIG: Config = {
  port: 8080,
  route: "/",
  folder: "./",
  branch: "master",
  secret: "changeme",
  commands: ["git pull"],
}

export const loadConfig = async (): Promise<Config> => {
  // assume that the config file is in the same folder where the server is run
  const configFilePath = path.resolve(process.cwd(), "./", CONFIG_FILE_NAME)

  // attempt to load config file from disk
  const userConfig = await readFile(configFilePath)
    .then((d) => JSON.parse(d.toString()) as Partial<Config>)
    .catch((err) => {
      console.log(`Failed to load '${configFilePath}', using default config...\n`)
      return {} as Partial<Config>
    })

  const mergedConfig = { ...DEFAULT_CONFIG, ...userConfig }

  console.log("Config:\n", mergedConfig)

  return mergedConfig
}
