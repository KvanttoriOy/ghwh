#!/usr/bin/env node

import { startServer } from "./services/express"
import { processArgs } from "./config/args"
import { loadConfig } from "./config"
import { startInDaemonMode } from "./services/pm2"

const init = async () => {
  const args = processArgs()

  // load config from disk and inject into express
  const config = await loadConfig(args)

  if (args.daemon) {
    await startInDaemonMode(args)
  } else {
    await startServer(config)
  }
}

init()
