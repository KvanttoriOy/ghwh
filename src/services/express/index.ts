import express from "express"
import { Server } from "http"
import { verifyPostData } from "../../middleware/auth"
import { webhookHandler } from "../../handler"
import { printBanner } from "../../helpers/banner"
import { Config } from "../../types/config"

export const startServer = async (config: Config) => {
  const app = express()
  const http = new Server(app)

  printBanner()

  // inject config into express
  app.set("ghwh-config", config)

  app.use(express.json())

  // Listen to requests on the configured route
  app.post(config.route, verifyPostData, webhookHandler)

  // Start server
  http.listen(config.port, () => {
    console.log("Using config:", config, "\n")
    console.log("Server started successfully, listening on port", config.port)
  })
}
