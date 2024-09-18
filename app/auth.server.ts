import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { Authenticator } from "remix-auth"
import { GoogleStrategy } from "remix-auth-google"
import { supabase } from "./supabase.server"
import { UserType } from "./types/user"
import { sessionStorage } from "./utils/session.server"

export const authenticator = new Authenticator<UserType>(sessionStorage)

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  },
  async ({ profile }) => {
    const { data }: PostgrestSingleResponse<UserType[]> = await supabase
      .from("users")
      .upsert(
        {
          email: profile.emails[0].value,
          name: profile.displayName,
          photo: profile.photos[0].value,
        },
        { onConflict: "email" }
      )
      .select()

    return data[0]
  }
)

authenticator.use(googleStrategy)
