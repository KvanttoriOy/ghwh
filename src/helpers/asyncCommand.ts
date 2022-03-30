import { exec } from "child_process"

/**
 * Promisifies the `child_process.exec` function
 */
export const asyncExec = async (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) reject(err)
      resolve(stdout)
    })
  })
}
