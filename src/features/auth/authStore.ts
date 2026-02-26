import { create } from 'zustand'
import type { AuthState } from './auth'
import type { UserRole } from '../user/user'

export  interface AuthActions{
//로그인 유무
    login: (userId: string, name:string, username: string, role: UserRole) => void
    logout: () => void
}
export const useAuthStore = create<AuthState & AuthActions>(
    (set) => ({
        userId: null,
        username: null,
        role: null,
        name: null,
        isLoggedIn: false,

        login: (userId, name, username, role) =>
            set({
                userId,
                name,
                username,
                role,
                isLoggedIn: true,
            }),

        logout: () =>
            set({
                userId: null,
                name: null,
                username: null,
                role: null,
                isLoggedIn: false,
            }),
    }))