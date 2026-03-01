import type { UserRole } from "../user/user";

export interface AuthState {
    name: string | null;
    role?: UserRole | null;
    isLoggedIn: boolean;
}
