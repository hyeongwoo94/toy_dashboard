import { create } from 'zustand'
import type { User, UserRole } from './user'

interface UserState {
    users: User[]
}

interface UserActions {
  // 관리자가 유저에게 매니저를 줄지 일반 멤버로 권한을 주는 것
    setUserRole: (id: string, role: UserRole) => void
}

export const useUserStore = create<UserState & UserActions>((set) => ({
    users: [],

    setUserRole: (id, role) =>
        set((state) => ({
            users: state.users.map((u) =>
                u.id === id ? { ...u, role } : u
            ),
        })),
}))