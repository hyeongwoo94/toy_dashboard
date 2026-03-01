import type { User } from "./user";

export const mockUsers: User[] = [
    {
        loginId: "admin",
        password: "admin",
        name: "관리자",
        role: "admin",
    },
    {
        loginId: "manager",
        password: "manager123",
        name: "팀장",
        role: "manager",
    },
    {
        loginId: "user",
        password: "user123",
        name: "팀원",
        role: "member",
    },
];
