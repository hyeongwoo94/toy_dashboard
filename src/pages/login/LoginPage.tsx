import Btn from "../../components/CommonBtn";
import LoginInput from "./component/LoginInput";
function LoginPage() {
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
                            />
                        </li>
                        <li>
                            <LoginInput
                                type="password"
                                label="비밀번호"
                                placeholder="비밀번호 입력"
                                errorMsg="비밀번호 잘못입력함"
                                successMsg="올바르게 입력"
                            />
                        </li>
                    </ul>
                    <Btn text="로그인" btnClass="" />
                </div>
            </div>
        </>
    );
}

export default LoginPage;
