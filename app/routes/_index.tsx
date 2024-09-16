import { LoaderFunction, redirect } from "@remix-run/node"

export const loader: LoaderFunction = async () => {
  return redirect("/explore")
}
export default function App() {
  return null
}
