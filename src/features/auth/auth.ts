import type { UserRole } from "../user/user";

export interface AuthState {
    loginId: string | null;
    role?: UserRole | null;
    isLoggedIn: boolean;
}
