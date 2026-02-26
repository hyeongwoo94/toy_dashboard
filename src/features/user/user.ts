export type UserRole = 'admin' | 'manager' | 'member';

// 전체관리자
// 팀장
// 팀원

export interface User {
    id:string                   //유저 아이디 넘버
    password: string            //유저 비밀번호
    username: string            //유저 실제 아이디
    name: string                //유저 이름
    role: UserRole              //유저 권한
}