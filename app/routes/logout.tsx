import { authenticator } from "~/auth.server"
import { ActionFunction, redirect } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/" })
  return redirect("/explore")
}
