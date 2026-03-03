import { create } from "zustand";
import type { AuthState } from "./auth";
import type { UserRole } from "../user/user";

const AUTH_STORAGE_KEY = "toy_dashboard_auth";

export interface AuthActions {
    login: (name: string, role: UserRole) => void;
    logout: () => void;
    restoreFromStorage: () => void;
}
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    name: null,
    role: null,
    isLoggedIn: false,

    login: (name, role) => {
        set({ name, role, isLoggedIn: true });
        localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({ name, role, isLoggedIn: true })
        );
    },

    logout: () => {
        set({ name: null, role: null, isLoggedIn: false });
        localStorage.removeItem(AUTH_STORAGE_KEY);
    },

    restoreFromStorage: () => {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!stored) return;
        try {
            const parsed = JSON.parse(stored) as AuthState;
            if (parsed.isLoggedIn && parsed.name != null && parsed.role != null) {
                set(parsed);
            }
        } catch {
            // 잘못된 데이터면 무시
        }
    },
}));
