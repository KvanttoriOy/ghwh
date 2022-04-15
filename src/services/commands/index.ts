import path from "path"
import { performance } from "perf_hooks"
import { checkFolderExists } from "../../helpers/files"
import { EXECUTION_FOLDER } from "../../constants"
import { asyncCommand } from "../../helpers/asyncCommand"
import { asyncSequence } from "../../helpers/asyncSequence"
import { Config } from "../../types/config"

export const executeBranchCommands = async (config: Config, branch: string) => {
  const startTime = performance.now()

  // get the configuration for the given branch
  const { dir, commands } = config.branch[branch]

  const error = await checkFolderExists(dir ?? "./").catch((err) => err)
  if (error) {
    console.error(error)
    return
  }

  // Resolve the command path relative to the path where the server was run.
  // We need to use the INIT_CWD env variable because process.cwd and others report
  // wrong paths when running inside pm2.
  const commandPath = path.resolve(EXECUTION_FOLDER, dir ?? "./")

  // create array of async functions to execute
  const cmdArr = commands.map((s) => () => asyncCommand(s, { dir: commandPath, commands }))

  // execute commands in sequence
  const result = await asyncSequence(cmdArr).catch((err) => ({ err }))

  // Log any resulting errors
  if (!Array.isArray(result)) {
    console.error("ERROR:", result.err)
  }

  const endTime = performance.now()
  const elapsed = Math.round((endTime - startTime) / 1000)

  console.log(`\n${"-".repeat(40)}\n`, `Execution took ${elapsed} seconds`)
}
