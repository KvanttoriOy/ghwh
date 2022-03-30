import { hideBin } from "yargs/helpers"
import yargs from "yargs/yargs"
import type { Args } from "../types/args"

export const processArgs = (): Partial<Args> => {
  const args = yargs(hideBin(process.argv)).argv as Partial<Args>

  return {
    config: args.config,
    daemon: args.daemon,
  }
}
