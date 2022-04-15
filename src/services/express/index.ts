import express from "express"
import { Server } from "http"
import { verifyPostData } from "../../middleware/auth"
import { webhookHandler } from "../../handler"
import { Config } from "../../types/config"

export const startServer = async (config: Config) => {
  const app = express()
  const http = new Server(app)

  // inject config into express
  app.set("huukki-config", config)

  app.use(express.json())

  // Listen to requests on the configured route
  app.post(config.server.route, verifyPostData, webhookHandler)

  // Start server
  http.listen(config.server.port, () => {
    console.log("Server started successfully, listening on port", config.server.port)
  })
}
