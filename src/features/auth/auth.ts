import type { UserRole } from "../user/user";

export interface AuthState {
    userName: string | null;
    role?: UserRole | null;
    isLoggedIn: boolean;
}
