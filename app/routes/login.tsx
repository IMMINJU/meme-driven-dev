import { authenticator } from "~/auth.server"
import { ActionFunction } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate("google", request)
}
