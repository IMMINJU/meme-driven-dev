import { BaseEntity } from "./base"

export interface UserType extends BaseEntity {
  photo: string
  name: string
}
