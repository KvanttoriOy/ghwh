import { asyncCommand } from "../helpers/asyncCommand"
import { asyncSequence } from "../helpers/asyncSequence"
import type { Config } from "../types/config"
import type { RequestHandler } from "express"
import { performance } from "perf_hooks"
import path from "path"
import { EXECUTION_FOLDER } from "../constants"

export const webhookHandler: RequestHandler = async (req, res) => {
  const startTime = performance.now()

  const { branch, commands, folder } = req.app.get("huukki-config") as Config

  console.log("\nReceived webhook!\n")

  // Check that request is to the right branch
  if (req.body.ref !== `refs/heads/${branch}`) {
    console.log(`Push was not to ${branch}, ignoring...`)
    return res.status(200).json({ status: 200, message: `push was not to ${branch}, ignoring...` })
  }

  // check that request body is JSON
  if (req.headers["content-type"] !== "application/json") {
    console.error("Request body is not in JSON format, ignoring...")
    return res.status(400).json({ status: 400, message: "body must be application/json" })
  }

  // notify webhook sender that webhook was received correctly
  res.status(200).json({ message: "received" })

  // Resolve the command path relative to the path where the server was run.
  // We need to use the INIT_CWD env variable because process.cwd and others report
  // wrong paths when running inside pm2.
  const commandPath = path.resolve(EXECUTION_FOLDER, folder)

  // create array of async functions to execute
  const cmdArr = commands.map((s) => () => asyncCommand(s, { dir: commandPath, commands }))
  const result = await asyncSequence(cmdArr).catch((err) => ({ err }))

  // Log any resulting errors
  if (!Array.isArray(result)) console.error("ERROR:", result.err)

  const endTime = performance.now()
  const elapsed = Math.round((endTime - startTime) / 1000)

  console.log(`\n${"-".repeat(40)}\n`, `Execution took ${elapsed} seconds`)
}
