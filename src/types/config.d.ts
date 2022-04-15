export type Config = {
  server: {
    port: number
    route: string
    secret?: string
  }
  branch: Record<string, BranchOptions>
}

type BranchOptions = {
  dir?: string
  commands: string[]
}
