import path from "path"
import { readFile } from "fs/promises"
import type { Config } from "../types/config"
import type { Args } from "../types/args"
import { CONFIG_FILE_NAME, DEFAULT_CONFIG } from "../constants"

export const loadConfig = async (args: Partial<Args>): Promise<Config> => {
  // assume that the config file is in the same folder where the server is run
  const configFilePath = path.resolve(
    process.env.INIT_CWD as string,
    args.config ?? CONFIG_FILE_NAME
  )

  // attempt to load config file from disk
  const userConfig = await readFile(configFilePath)
    .then((data) => {
      console.log("Found custom config!")
      return JSON.parse(data.toString()) as Partial<Config>
    })
    .catch((err) => {
      console.log(`Could not find '${configFilePath}'\n`)
      return {} as Partial<Config>
    })

  return { ...DEFAULT_CONFIG, ...userConfig }
}
