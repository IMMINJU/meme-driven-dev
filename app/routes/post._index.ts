import { supabase } from "~/supabase.server"
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node"

const sanitizeKey = (key: string) => {
  // 허용되지 않는 문자 제거
  const forbiddenChars = /[^\x00-\x7F]|[?#\[\]\/\\=+<>:;\"|*'&%@^$,]/g
  key = key.replace(forbiddenChars, "")

  // 슬래시로 시작하거나 끝나는 경우 제거
  key = key.replace(/^\/+|\/+$/g, "")

  // 연속된 슬래시를 하나의 슬래시로 변환
  key = key.replace(/\/{2,}/g, "/")

  // 공백 제거
  key = key.replace(/\s+/g, "")

  return key
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const method = request.method

  if (method === "POST") {
    const tags = formData.get("tags") as string
    const title = formData.get("title") as string
    const user_id = formData.get("user_id") as string
    const file = formData.get("file") as File

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${Date.now()}-${sanitizeKey(file.name)}`, file)

    console.log(error)

    if (!data || error) {
      throw new Response(error.message, { status: 500 })
    }

    const { error: insertError } = await supabase
      .from("posts")
      .insert([
        { title, image: data.fullPath, tags: JSON.parse(tags), user_id },
      ])
    console.log(insertError)
    if (insertError) {
      throw new Response(insertError.message, { status: 500 })
    }

    return redirect("/explore")
  } else if (method === "DELETE") {
    const id = formData.get("id") as string

    const { error } = await supabase.from("posts").delete().eq("id", id)

    if (error) {
      throw new Response(error.message, { status: 500 })
    }

    return redirect("/explore")
  }
}

export const loader: LoaderFunction = () => {
  return redirect("/explore")
}
