#!/usr/bin/env node

// used whenever a "@/*" import is used, DO NOT REMOVE
import "module-alias/register"

import express from "express"
import { Server } from "http"
import { loadConfig } from "./config"
import { verifyPostData } from "./middleware/auth"
import { webhookHandler } from "./handler"
import { printBanner } from "./helpers/banner"

const start = async () => {
  const app = express()
  const http = new Server(app)

  printBanner()

  // load config from disk and inject into express
  const config = await loadConfig()
  app.set("ghwh-config", config)

  app.use(express.json())

  // Listen to requests on the configured route
  app.post(config.route, verifyPostData, webhookHandler)

  // Start server
  http.listen(config.port, () =>
    console.log("Server started successfully, listening on port", config.port)
  )
}

start()
