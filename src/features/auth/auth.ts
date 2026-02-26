import type { UserRole } from '../user/user'

export interface AuthState {
  userId: string | null
  username: string | null
  name: string | null
  role: UserRole | null
  isLoggedIn: boolean
}