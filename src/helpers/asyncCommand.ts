import { exec } from "child_process"

/**
 * Promisifies the `child_process.exec` function
 */
export const asyncExec = async (command: string, dir: string) => {
  return new Promise((resolve, reject) => {
    console.log(`Executing: "${command}"`)

    exec(command, { cwd: dir }, (err, stdout) => {
      if (err) reject(err)
      resolve(stdout)
    })
  })
}
