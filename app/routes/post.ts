import { supabase } from "~/supabase.server"
import { ActionFunction, redirect } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const tags = formData.get("tags") as string
  const title = formData.get("title") as string
  const user_id = formData.get("user_id") as string
  const file = formData.get("file") as File

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/${Date.now()}-${file.name}`, file)

  if (!data || error) {
    throw new Response(error.message, { status: 500 })
  }

  const { error: insertError } = await supabase
    .from("posts")
    .insert([{ title, image: data.fullPath, tags: JSON.parse(tags), user_id }])

  if (insertError) {
    throw new Response(insertError.message, { status: 500 })
  }

  return redirect("/explore")
}
