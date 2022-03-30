export const asyncSequence = async <T>(list: (() => Promise<T>)[]): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    let results: any[] = []
    let failed = false

    const doNext = (n: number) => {
      const cmd = list[n]

      cmd()
        .catch((err) => {
          failed = true
          reject(err)
        })
        .then((result) => {
          // do not execute next command if previous failed
          if (failed) return

          results.push(result)
          n++

          if (n < list.length) {
            doNext(n)
          } else {
            resolve(results)
          }
        })
    }

    doNext(0)
  })
}
