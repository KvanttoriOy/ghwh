#!/usr/bin/env node

import { startServer } from "./services/express"
import { processArgs } from "./config/args"
import { loadConfig } from "./config"
import { startInDaemonMode } from "./services/pm2"
import { format } from "./helpers/formatting"
import { VERSION } from "./constants"

const init = async () => {
  console.log(format.banner(`@kvanttori/huukki ${VERSION}`))

  const args = processArgs()
  const config = await loadConfig(args)

  if (args.daemon) {
    await startInDaemonMode(args)
  } else {
    await startServer(config)
  }
}

init()
