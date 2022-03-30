export const asyncSequence = async <T>(list: (() => Promise<T>)[]): Promise<T[]> => {
  return new Promise((resolve) => {
    let results: any[] = []

    const doNext = (n: number) => {
      const cmd = list[n]

      cmd()
        .catch((err) => {
          console.log(err)

          resolve(results) // end execution on error
        })
        .then((result) => {
          console.log(result)
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
