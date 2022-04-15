import { access } from "fs"
export const checkFolderExists = async (path: string) =>
  new Promise<void>((resolve, reject) => {
    access(path, (err) => {
      // error occurred, user either has no access to path or it doesn't exist,
      // so we reject the promise
      err ? reject(err) : resolve()
    })
  })
