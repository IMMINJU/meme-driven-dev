import { BaseEntity } from "./base"
import { UserType } from "./user"

export interface PostType extends BaseEntity {
  title: string
  tags: string[]
  image: string
  source?: { type: "link" | "text"; value: string }
  user: UserType
}
