import { create } from "zustand";
import type { AuthState } from "./auth";
import type { UserRole } from "../user/user";

export interface AuthActions {
    login: (loginId: string, role: UserRole) => void;
    logout: () => void;
}
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    loginId: null,
    role: null,
    isLoggedIn: false,

    login: (loginId, role) =>
        set({
            loginId,
            role,
            isLoggedIn: true,
        }),

    logout: () =>
        set({
            loginId: null,
            role: null,
            isLoggedIn: false,
        }),
}));
