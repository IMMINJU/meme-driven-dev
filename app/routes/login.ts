import { authenticator } from "~/auth.server"
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate("google", request)
}

export const loader: LoaderFunction = () => {
  return redirect("/explore")
}
