import { supabase } from "~/supabase.server"
import { LoaderFunction, redirect } from "@remix-run/node"
import { commitSession, getSession } from "../session.server"

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (!code) {
    return new Response("코드가 제공되지 않았습니다.", { status: 400 })
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data?.session) {
    return new Response("세션을 가져오는 중 오류 발생", { status: 500 })
  }

  const { access_token, refresh_token } = data.session

  const session = await getSession()
  session.set("accessToken", access_token)
  session.set("refreshToken", refresh_token)

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  })
}
