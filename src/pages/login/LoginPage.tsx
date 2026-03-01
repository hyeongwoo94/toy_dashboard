import { useState } from "react";
import Btn from "../../components/CommonBtn";
import { useAuthStore } from "../../features/auth/authStore";
import LoginInput from "./component/LoginInput";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);

    return (
        <>
            <div className="login_sec">
                <div className="-wrap">
                    <h2 className="-title">나만의 테스크페이지</h2>
                    <ul className="common_list_flex">
                        <li>
                            <LoginInput
                                type="text"
                                label="아이디"
                                placeholder="아이디입력"
                                errorMsg="아이디 잘못입력함"
                                successMsg="올바르게 입력"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </li>
                        <li>
                            <LoginInput
                                type="password"
                                label="비밀번호"
                                placeholder="비밀번호 입력"
                                errorMsg="비밀번호 잘못입력함"
                                successMsg="올바르게 입력"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </li>
                    </ul>
                    <Btn
                        text="로그인"
                        btnClass=""
                        onClick={() => login(username || "user", "member")}
                    />
                </div>
            </div>
        </>
    );
}

export default LoginPage;
