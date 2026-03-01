import type { User } from "../../../features/user/user";
import { mockUsers } from "../../../features/user/mockUsers";

/**
 * 입력한 loginId, password가 목데이터와 일치하는 유저가 있으면 해당 User를,
 * 없으면 null을 반환합니다.
 */
export function checkLogin(loginId: string, password: string): User | null {
    const user = mockUsers.find(
        (u) => u.loginId === loginId && u.password === password,
    );
    return user ?? null;
}
