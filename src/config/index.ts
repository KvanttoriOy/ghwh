import path from "path"
import { readFile } from "fs/promises"
import type { Config } from "../types/config"
import type { Args } from "../types/args"
import { CONFIG_FILE_NAME, DEFAULT_CONFIG, EXECUTION_FOLDER } from "../constants"
import { parse } from "yaml"
import { validateConfig } from "../helpers/validateConfig"

export const loadConfig = async (args: Partial<Args>): Promise<Config> => {
  // assume that the config file is in the same folder where the server is run
  const configFilePath = path.resolve(EXECUTION_FOLDER, args.config ?? CONFIG_FILE_NAME)

  // attempt to load config file from disk
  const parsedConfig = await readFile(configFilePath)
    .then((data) => {
      const parsed = parse(data.toString())

      const error = validateConfig(parsed)
      if (error) {
        console.error("ERROR:", error)
        return null
      }

      console.log(`Loaded config from '${configFilePath}'`)
      return parsed
    })
    .catch(() => {
      console.log(`No config file found in '${configFilePath}'\n`)
      return null
    })

  // use default config if no config file is found
  if (!parsedConfig) {
    console.log("using default config...")
    return DEFAULT_CONFIG
  }

  const error = validateConfig(parsedConfig)
  if (error) throw new Error(error.toString())

  return parsedConfig!
}
