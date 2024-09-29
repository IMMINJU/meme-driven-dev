import { supabase } from "~/supabase.server"
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const file = formData.get("file") as File
  const title = formData.get("title")
  const tags = formData.get("tags")
  const origin = formData.get("origin")

  if (!file) {
    return json({ error: "No file uploaded" }, { status: 400 })
  }

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/${file.name}`, file)

  if (error) {
    return json({ error: error.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(data.path)

  const { error: insertError } = await supabase.from("posts").insert({
    title,
    tags,
    origin,
    image: publicUrl,
  })

  if (insertError) {
    return json({ error: insertError.message }, { status: 500 })
  }

  return
}

export const loader: LoaderFunction = () => {
  return redirect("/explore")
}
