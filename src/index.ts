import "module-alias/register" // used for fixing "@/*" imports, DO NOT REMOVE

import express from "express"
import { Server } from "http"
import { readConfig } from "./config"

const start = async () => {
  const app = express()
  const http = new Server(app)

  const config = await readConfig()

  app.use(express.json())

  // Listen to requests on the configured path
  app.get(config.path, (req, res) => {
    console.log("got request:", req.body)

    if (req.method !== "POST") {
      return res.status(405).end("method not allowed")
    }

    console.log("hello", req.body)

    res.status(200).json({ hello: "world" })
  })

  http.listen(config.port, () => console.log("listening on port", config.port))
}

start()
