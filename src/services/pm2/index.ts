import path from "path"
import type { Args } from "../../types/args"
import { exec } from "shelljs"

/**
 * Starts the server using PM2
 */
export const startInDaemonMode = async (args: Partial<Args>) => {
  // find directory where huukki lives to get access to pm2
  const npxDir = path.resolve(__dirname, "../../../")

  if (typeof args.daemon === "string") {
    switch (args.daemon) {
      case "start":
        return exec("pm2 start ecosystem.config.js", { cwd: npxDir })

      case "stop":
        return exec("pm2 stop ecosystem.config.js", { cwd: npxDir })
    }
  }

  exec("pm2 start ecosystem.config.js", { cwd: npxDir })
}
