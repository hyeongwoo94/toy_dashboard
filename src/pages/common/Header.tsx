import CommonBtn from "../../components/CommonBtn";
import { useAuthStore } from "../../features/auth/authStore";
import { Link } from "react-router-dom";

function Header() {
    const name = useAuthStore((state) => state.name);
    const logout = useAuthStore((state) => state.logout);
    return(
        <>
            <header className="header">
                <div className="header_layout">
                    <div className="_left">
                        <Link to ="/" className="logo_box">
                        <svg width="275" viewBox="0 0 275 50" xmlns="http://www.w3.org/2000/svg">
                            <text x="5" y="40" font-family="Arial, sans-serif" font-weight="900" font-size="42" letter-spacing="-1">
                            <tspan fill="#276678">Bigbro</tspan>
                            <tspan fill="#1687A7">_</tspan>
                            <tspan fill="#1687A7">woo</tspan>
                            </text>
                        </svg>
                        </Link>
                    </div>
                    <ul className="header_menu">
                        <li>
                            <Link to=''>메뉴1</Link>
                        </li>
                        <li>
                            <Link to=''>메뉴1</Link>
                        </li>
                        <li>
                            <Link to=''>메뉴1</Link>
                        </li>
                        <li>
                            <Link to=''>메뉴1</Link>
                        </li>
                    </ul>
                    <div className="_right">
                        <p className="user_name">{name ?? ""}</p>
                        <div className="logout_btn">
                            <CommonBtn type="button" onClick={logout} text="로그아웃"></CommonBtn>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header