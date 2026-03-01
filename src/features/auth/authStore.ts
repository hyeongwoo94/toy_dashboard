import { create } from "zustand";
import type { AuthState } from "./auth";
import type { UserRole } from "../user/user";

export interface AuthActions {
    login: (userName: string, role: UserRole) => void;
    logout: () => void;
}
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    userName: null,
    role: null,
    isLoggedIn: false,

    login: (userName, role) =>
        set({
            userName,
            role,
            isLoggedIn: true,
        }),

    logout: () =>
        set({
            userName: null,
            role: null,
            isLoggedIn: false,
        }),
}));
