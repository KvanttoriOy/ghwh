import { RequestHandler } from "express"
import crypto from "crypto"

const sigHeaderName = "X-Hub-Signature-256"
const sigHashAlg = "sha256"

export const verifyPostData = (secret: string): RequestHandler => {
  return (req, res, next) => {
    // do no validation if secret is not provided
    if (!secret || secret === "") return next()

    if (!(req as any).body) {
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
}
