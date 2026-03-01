import { create } from "zustand";
import type { AuthState } from "./auth";
import type { UserRole } from "../user/user";

export interface AuthActions {
    login: (name: string, role: UserRole) => void;
    logout: () => void;
}
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    name: null,
    role: null,
    isLoggedIn: false,

    login: (name, role) =>
        set({
            name,
            role,
            isLoggedIn: true,
        }),

    logout: () =>
        set({
            name: null,
            role: null,
            isLoggedIn: false,
        }),
}));
