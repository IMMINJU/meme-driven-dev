import { supabase } from "~/supabase.server"
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  const { error: dbError } = await supabase
    .from("contacts")
    .insert([{ name, email, message }])

  if (dbError) {
    return json(
      { error: "Failed to save contact information" },
      { status: 500 }
    )
  }

  return json({ success: true })
}

export const loader: LoaderFunction = () => {
  return redirect("/explore")
}
