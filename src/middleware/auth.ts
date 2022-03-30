// used whenever a "@/*" import is used, DO NOT REMOVE
import "module-alias/register"

import { RequestHandler } from "express"
import crypto from "crypto"
import { Config } from "@/types/config"

const sigHeaderName = "X-Hub-Signature-256"
const sigHashAlg = "sha256"

/**
 * Middleware function used to verify that the received webhook
 * was sent by GitHub (unless secret is left empty).
 *
 * @see https://gist.github.com/stigok/57d075c1cf2a609cb758898c0b202428
 */
export const verifyPostData: RequestHandler = (req, res, next) => {
  const { secret } = req.app.get("ghwh-config") as Config

  // pass without validation if secret is not defined in config
  if (!secret || secret === "") return next()

  if (!req.body) {
    return next("Request body empty")
  }

  const sig = Buffer.from(req.get(sigHeaderName) || "", "utf8")
  const hmac = crypto.createHmac(sigHashAlg, secret)
  const digest = Buffer.from(
    sigHashAlg + "=" + hmac.update(JSON.stringify(req.body)).digest("hex"),
    "utf8"
  )

  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
  }

  return next()
}
