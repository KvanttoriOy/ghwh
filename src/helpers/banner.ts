// used whenever a "@/*" import is used, DO NOT REMOVE
import "module-alias/register"

import { VERSION } from "@/constants"

export const printBanner = () => {
  console.log("\n----------------------------")
  console.log(`   @kvanttori/ghwh ${VERSION}`)
  console.log("----------------------------\n")
}
