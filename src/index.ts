import "module-alias/register" // used for fixing "@/*" imports, DO NOT REMOVE

import express from "express"
import { Server } from "http"
import { loadConfig } from "./config"
import { verifyPostData } from "./middleware/auth"
import { asyncSequence } from "./helpers/asyncSequence"
import { asyncExec } from "./helpers/asyncCommand"

const start = async () => {
  const app = express()
  const http = new Server(app)

  console.log("\n----------------------\n    GitHook server\n----------------------\n")

  // load config.json from disk
  const config = await loadConfig()

  app.use(express.json())

  // Listen to requests on the configured route
  app.post(config.route, verifyPostData(config.secret), async (req, res) => {
    const payload = req.body

    console.log("\nReceived webhook\n")

    // Check that request is to the right branch
    if (payload.ref !== `refs/heads/${config.branch}`) {
      console.log(`Push was not to ${config.branch}, ignoring`)
      return res.status(200).end()
    }

    // check that request body is JSON
    if (req.headers["content-type"] !== "application/json") {
      return res.status(400).end("body must be application/json")
    }

    // execute configured commands in sequence
    const result = await asyncSequence(
      config.commands.map((s) => () => asyncExec(s, config.folder))
    ).catch((err) => ({ err }))

    // if the execution failed, fail the request
    if (!Array.isArray(result)) {
      console.error(result.err)
      return res.status(500).end(result.err.toString())
    }

    res.status(200).end("success")
  })

  http.listen(config.port, () => console.log("listening on port", config.port))
}

start()
