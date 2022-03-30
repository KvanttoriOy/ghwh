import { exec } from "shelljs"
import { format } from "./formatting"

type AsyncCommandOpts = {
  dir: string
  commands: string[]
}

/**
 * Simple async wrapper function around the `shelljs.exec` function.
 */
export const asyncCommand = async (command: string, options: AsyncCommandOpts) => {
  const commandIndex = options?.commands?.indexOf(command)
  const numCommands = options?.commands?.length

  return new Promise((resolve, reject) => {
    console.log(format.command(`${command} (${commandIndex + 1}/${numCommands})`))

    const cmd = exec(command, { cwd: options.dir, async: true, silent: true })

    cmd.stdout?.addListener("data", (d) => {
      console.log(format.prefix(d.toString(), "\t"))
    })

    cmd.stderr?.addListener("data", (d) => {
      console.error(format.prefix(d.toString(), "[ERR] "))
    })

    cmd.on("error", (code) => reject(code))
    cmd.on("close", (code) => resolve(code))
  })
}
