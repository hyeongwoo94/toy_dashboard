import CommonBtn from "../../components/CommonBtn";
import { useAuthStore } from "../../features/auth/authStore";
import { Link } from "react-router-dom";

function Header() {
    const name = useAuthStore((state) => state.name);
    const logout = useAuthStore((state) => state.logout);
    return (
        <>
            <header className="header">
                <div className="header_layout">
                    <div className="_left">
                        <Link to="/" className="logo_box">
                            <svg
                                className="logo_svg"
                                width="275"
                                viewBox="0 0 275 50"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <text x="5" y="40">
                                    <tspan fill="#276678">Bigbro</tspan>
                                    <tspan fill="#1687A7">_</tspan>
                                    <tspan fill="#1687A7">woo</tspan>
                                </text>
                            </svg>
                        </Link>
                    </div>
                    <ul className="header_menu">
                        <li className="_menu_box">
                            <Link to="/task" className="_menu_link">
                                업무
                            </Link>
                        </li>
                        <li className="_menu_box">
                            <Link to="" className="_menu_link">
                                메뉴1
                            </Link>
                        </li>
                        <li className="_menu_box">
                            <Link to="" className="_menu_link">
                                메뉴1
                            </Link>
                        </li>
                        <li className="_menu_box">
                            <Link to="" className="_menu_link">
                                메뉴1
                            </Link>
                        </li>
                    </ul>
                    <div className="_right">
                        <p className="user_name">{name ?? ""}</p>
                        <div className="logout_btn">
                            <CommonBtn
                                type="button"
                                onClick={logout}
                                text="로그아웃"
                            ></CommonBtn>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
