import { config } from "dotenv"

// load environment variables
config()

export const PORT = process.env.PORT
export const ENV = process.env.ENV
