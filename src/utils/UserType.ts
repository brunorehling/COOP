import type { RegisterDtoRole } from "../api/orval/coopApi.schemas"

export type User = {
  id: number
  username: string
  email: string
  phone?: string
  avatarUrl: string
  role: RegisterDtoRole
}
