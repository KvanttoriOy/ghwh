// used whenever a "@/*" import is used, DO NOT REMOVE
import "module-alias/register"

import { asyncExec } from "@/helpers/asyncCommand"
import { asyncSequence } from "@/helpers/asyncSequence"
import type { Config } from "@/types/config"
import type { RequestHandler } from "express"
import { performance } from "perf_hooks"

export const webhookHandler: RequestHandler = async (req, res) => {
  const config = req.app.get("ghwh-config") as Config

  const payload = req.body

  console.log("\nReceived webhook!\n")

  const startTime = performance.now()

  // Check that request is to the right branch
  if (payload.ref !== `refs/heads/${config.branch}`) {
    console.log(`Push was not to ${config.branch}, ignoring...`)
    return res.status(200).json({ message: `push was not to ${config.branch}, ignoring...` })
  }

  // check that request body is JSON
  if (req.headers["content-type"] !== "application/json") {
    console.error("Request body is not in JSON format, ignoring...")
    return res.status(400).json({ message: "body must be application/json" })
  }

  // notify webhook sender that webhook was received correctly
  res.status(200).json({ message: "started" })

  // execute configured commands in sequence
  const result = await asyncSequence(
    config.commands.map((s) => () => asyncExec(s, config.folder))
  ).catch((err) => ({ err }))

  // if the execution failed, fail the request
  if (!Array.isArray(result)) {
    console.error(result.err)
    return res.status(500).json({ message: result.err.toString() })
  }

  const endTime = performance.now()
  console.log("Completed in", Math.round((endTime - startTime) / 1000), "seconds")
}
