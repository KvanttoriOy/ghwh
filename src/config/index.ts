import { Config } from "@/types/config"
import { readFile } from "fs/promises"
import path from "path"

const DEFAULT_CONFIG: Config = {
  port: 8080,
  route: "/",
  folder: "./",
  branch: "master",
  secret: "",
  commands: ["git pull", "npm i", "npm run build", "npm start"],
}

export const loadConfig = async (): Promise<Config> => {
  const defaultConfigFilePath = path.resolve(process.cwd(), "./githook.config.default.json")
  const configFilePath = path.resolve(process.cwd(), "./githook.config.json")

  const defaultConfig = await readFile(defaultConfigFilePath)
    .then((d) => JSON.parse(d.toString()) as Config)
    .catch((err) => {
      console.error("Could not load default config (githook.config.default.json), exiting...")
      process.exit(1)
    })

  const userConfig = await readFile(configFilePath)
    .then((d) => JSON.parse(d.toString()) as Partial<Config>)
    .catch((err) => {
      console.log("Could not find/parse githook.config.json, using default config...\n")
      return {} as Partial<Config>
    })

  const mergedConfig = { ...defaultConfig, ...userConfig }

  console.log("Config:\n", mergedConfig)

  return mergedConfig
}
