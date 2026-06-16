import Btn from "../../../components/CommonBtn";
import type { User } from "../../../features/user/user";
import { mockUsers } from "../../../features/user/mockUsers";

interface LoginInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectAccount: (user: User) => void;
}

function LoginInfoModal({ isOpen, onClose, onSelectAccount }: LoginInfoModalProps) {
    if (!isOpen) return null;

    return (
        <div className="login_info_modal" role="dialog" aria-label="테스트 계정 안내">
            <div className="_content">
                <h3 className="_title">테스트 계정 안내</h3>
                <p className="_desc">계정을 클릭하면 해당 정보로 로그인됩니다.</p>
                <ul className="_account_list">
                    {mockUsers.map((user) => (
                        <li
                            key={user.loginId}
                            className="_account_item"
                            onClick={() => onSelectAccount(user)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onSelectAccount(user);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                        >                            <span className="_role">{user.name}</span>
                            <div className="_credentials">
                                <span>
                                    <strong>아이디</strong> {user.loginId}
                                </span>
                                <span>
                                    <strong>비밀번호</strong> {user.password}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="_btn_layout">
                    <Btn text="닫기" btnClass="-cancel" onClick={onClose} />
                </div>
            </div>
        </div>
    );
}

export default LoginInfoModal;
