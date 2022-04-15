import type { Config } from "../types/config"
import type { RequestHandler } from "express"
import { executeBranchCommands } from "../services/commands"

export const webhookHandler: RequestHandler = async (req, res) => {
  const config = req.app.get("huukki-config") as Config

  // check that request body is JSON
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({ status: 400, message: "body must be application/json" })
  }

  const matchedBranch = Object.keys(config.branch).find((b) => req.body.ref === `refs/heads/${b}`)
  if (!matchedBranch) {
    return res
      .status(200)
      .json({ status: 200, message: `No configuration for '${req.body.ref}' found, ignoring...` })
  }

  // notify webhook sender that webhook was received correctly
  res.status(200).json({ message: "received" })

  // execute the commands configured for the branch where the push happened
  await executeBranchCommands(config, matchedBranch)
}
