import { exec } from "shelljs"

/**
 * Simple async wrapper function around the `shelljs.exec` function.
 */
export const asyncCommand = async (command: string, dir?: string) => {
  return new Promise((resolve, reject) => {
    console.log(`\n\n------- [${command}] -------\n`)

    const cmd = exec(command, { cwd: dir, async: true })

    cmd.on("error", (code) => reject(code))
    cmd.on("close", (code) => resolve(code))
  })
}
