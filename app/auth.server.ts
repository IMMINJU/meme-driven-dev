import { supabase } from "~/supabase.server"
import { redirect } from "@remix-run/node"

export async function login() {
  console.log("start")
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  })

  if (error) {
    throw new Error(`Login failed: ${error.message}`)
  }

  return redirect(data.url)
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(`Logout failed: ${error.message}`)
  }

  return redirect("/")
}
