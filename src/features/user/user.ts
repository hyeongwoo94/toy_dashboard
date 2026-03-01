export type UserRole = 'admin' | 'manager' | 'member';

// 전체관리자
// 팀장
// 팀원

export interface User {
    password: string            //유저 비밀번호
    loginId: string             //유저 로그인 아이디
    name: string                //유저 이름
    role: UserRole              //유저 권한
}