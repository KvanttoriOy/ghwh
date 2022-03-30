import "module-alias/register" // used for fixing "@/*" imports, DO NOT REMOVE

import express from "express"
import { Server } from "http"
import { PORT } from "@/config"

const start = async () => {
  const app = express()
  const http = new Server(app)

  /**
   * Define API here
   */

  http.listen(PORT, () => console.log("listening on port", PORT))
}

start()
