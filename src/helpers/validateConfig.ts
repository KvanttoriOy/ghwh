export const validateConfig = (c: any): string | null => {
  if (!c || typeof c !== "object") {
    return "config file is empty"
  }

  if (!Object.prototype.hasOwnProperty.call(c, "server") || typeof c?.server !== "object") {
    return "field 'config.server' missing"
  }

  if (
    !Object.prototype.hasOwnProperty.call(c.server, "port") ||
    !Object.prototype.hasOwnProperty.call(c.server, "route") ||
    typeof c.server.route !== "string"
  ) {
    return "field(s) 'config.server.port' or 'config.server.route' missing"
  }

  // branch
  if (!Object.prototype.hasOwnProperty.call(c, "branch") || typeof c.branch !== "object") {
    return "field 'config.branch' missing"
  }

  if (
    !Object.values(c.branch).every(
      // check that every branch has a 'commands' field that is an array
      (b: any) =>
        typeof b === "object" &&
        Object.prototype.hasOwnProperty.call(b, "commands") &&
        Array.isArray(b.commands)
    )
  ) {
    return "field 'config.branch.<branch>.commands' missing"
  }

  // success
  return null
}
