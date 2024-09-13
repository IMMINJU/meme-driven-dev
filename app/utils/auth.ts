import { getSession } from "~/session.server"
import { redirect } from "@remix-run/node"

export async function requireUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"))
  const userId = session.get("userId")

  if (!userId) {
    throw redirect("/login")
  }

  return { userId, session }
}
