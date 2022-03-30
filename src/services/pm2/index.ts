import path from "path"
import type { Args } from "../../types/args"
import { asyncCommand } from "../../helpers/asyncCommand"

/**
 * Starts the server using PM2
 */
export const startInDaemonMode = async (args: Partial<Args>) => {
  // find directory where ghwh lives to get access to pm2
  const npxDir = path.resolve(__dirname, "../../../")

  if (typeof args.daemon === "string") {
    switch (args.daemon) {
      case "start":
        return await asyncCommand("pm2 start ecosystem.config.js", npxDir)

      case "stop":
        return await asyncCommand("pm2 stop ecosystem.config.js", npxDir)
    }
  }

  await asyncCommand("pm2 start ecosystem.config.js", npxDir)
}
