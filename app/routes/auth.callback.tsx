import { authenticator } from "~/auth.server"
import { LoaderFunction } from "@remix-run/node"

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/",
  })
}
