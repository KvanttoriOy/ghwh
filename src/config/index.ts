import { Config } from "@/types/config"
import { readFile } from "fs/promises"
import path from "path"

const CONFIG_FILE_NAME = "ghwh.config.js"

const DEFAULT_CONFIG: Config = {
  port: 8080,
  route: "/",
  folder: "./",
  branch: "master",
  secret: "",
  commands: ["git pull"],
}

export const loadConfig = async (): Promise<Config> => {
  const configFilePath = path.resolve(process.cwd(), "./", CONFIG_FILE_NAME)

  const userConfig = await readFile(configFilePath)
    .then((d) => JSON.parse(d.toString()) as Partial<Config>)
    .catch((err) => {
      console.log(`Could not find/parse ${configFilePath}, using default config...\n`)
      return {} as Partial<Config>
    })

  const mergedConfig = { ...DEFAULT_CONFIG, ...userConfig }

  console.log("Config:\n", mergedConfig)

  return mergedConfig
}
