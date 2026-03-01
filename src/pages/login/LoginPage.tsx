import { useState } from "react";
import Btn from "../../components/CommonBtn";
import { useAuthStore } from "../../features/auth/authStore";
import { checkLogin } from "./features/checkLogin";
import LoginInput from "./component/LoginInput";

function LoginPage() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = checkLogin(loginId, password);
        if (user) login(user.name, user.role);
    };

    return (
        <>
            <div className="login_sec">
                <div className="-wrap">
                    <h2 className="-title">나만의 테스크페이지</h2>
                    <form onSubmit={handleSubmit} className="common_list_flex">
                        <ul className="common_list_flex">
                            <li>
                                <LoginInput
                                    type="text"
                                    label="아이디"
                                    placeholder="아이디입력"
                                    errorMsg="아이디 잘못입력함"
                                    successMsg="올바르게 입력"
                                    value={loginId}
                                    onChange={(e) => setLoginId(e.target.value)}
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </li>
                        </ul>
                        <Btn text="로그인" btnClass="" type="submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
