import { useState } from "react";
import Btn from "../../components/CommonBtn";
import { useAuthStore } from "../../features/auth/authStore";
import { mockUsers } from "../../features/user/mockUsers";
import LoginInput from "./component/LoginInput";

function LoginPage() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [loginIdError, setLoginIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const login = useAuthStore((state) => state.login);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginIdError(false);
        setPasswordError(false);

        if (!loginId.trim()) {
            setLoginIdError(true);
            return;
        }
        if (!password.trim()) {
            setPasswordError(true);
            return;
        }

        const userById = mockUsers.find((u) => u.loginId === loginId.trim());
        if (!userById) {
            setLoginIdError(true);
            return;
        }
        if (userById.password !== password) {
            setPasswordError(true);
            return;
        }
        login(userById.name, userById.role);
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
                                    errorMsg="아이디가 없거나 잘못입력"
                                    successMsg="올바르게 입력"
                                    value={loginId}
                                    onChange={(e) => {
                                        setLoginId(e.target.value);
                                        setLoginIdError(false);
                                    }}
                                    showError={loginIdError}
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
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError(false);
                                    }}
                                    showError={passwordError}
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
