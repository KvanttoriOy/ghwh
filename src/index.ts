#!/usr/bin/env node

import "module-alias/register" // used for fixing "@/*" imports, DO NOT REMOVE

import express from "express"
import { Server } from "http"
import { loadConfig } from "./config"
import { verifyPostData } from "./middleware/auth"
import { asyncSequence } from "./helpers/asyncSequence"
import { asyncExec } from "./helpers/asyncCommand"
import { performance } from "perf_hooks"

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

    res.status(200).json({ message: "completed" })
  })

  http.listen(config.port, () => console.log("listening on port", config.port))
}

start()
