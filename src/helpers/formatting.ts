const PRINT_WIDTH = 60

const prefix = (str: string, prefix: string) => prefix + str.split("\n").join(`\n${prefix}`)

/**
 * Draws a line above and below the given text,
 * and centers the text horizontally between the lines.
 */
const banner = (str: string) => {
  const margin = Math.max((PRINT_WIDTH - str.length) / 2, 0)

  return `\n${"#".repeat(PRINT_WIDTH)}\n \n${" ".repeat(margin)}${str}\n \n${"#".repeat(
    PRINT_WIDTH
  )}\n`
}

const command = (str: string) => {
  const lineLength = Math.floor((PRINT_WIDTH - str.length - 2) / 2)

  return ` \n${"-".repeat(lineLength)} ${str} ${"-".repeat(lineLength)}\n `
}

export const format = {
  banner,
  prefix,
  command,
}
