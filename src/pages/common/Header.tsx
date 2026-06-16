import { useEffect, useState } from "react";
import CommonBtn from "../../components/CommonBtn";
import { useAuthStore } from "../../features/auth/authStore";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const name = useAuthStore((state) => state.name);
    const logout = useAuthStore((state) => state.logout);
    const { pathname } = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isTaskList =
        pathname === "/task" ||
        (pathname.startsWith("/task/") && !pathname.startsWith("/task/edit"));
    const isTaskEdit = pathname.startsWith("/task/edit");
    const isNotice = pathname.startsWith("/notice");
    const isExplain = pathname.startsWith("/explain");

    const menuItems = [
        { to: "/task", label: "업무", active: isTaskList },
        { to: "/task/edit", label: "업무요청", active: isTaskEdit },
        { to: "/notice", label: "공지사항", active: isNotice },
        { to: "/explain", label: "사이트설명", active: isExplain },
    ];

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        setIsMobileMenuOpen(false);
        logout();
    };

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
                        {menuItems.map((item) => (
                            <li
                                key={item.to}
                                className={`_menu_box ${item.active ? "on" : ""}`}
                            >
                                <Link to={item.to} className="_menu_link">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="_right">
                        <p className="user_name">{name ?? ""}</p>
                        <div className="logout_btn">
                            <CommonBtn
                                type="button"
                                onClick={logout}
                                text="로그아웃"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="header_hamburger"
                        aria-label="메뉴 열기"
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <span className="_bar" />
                        <span className="_bar" />
                        <span className="_bar" />
                    </button>
                </div>

                <div
                    className={`header_mobile_drawer ${isMobileMenuOpen ? "on" : ""}`}
                    aria-hidden={!isMobileMenuOpen}
                >
                    <button
                        type="button"
                        className="_overlay"
                        aria-label="메뉴 닫기"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="_panel">
                        <div className="_panel_head">
                            <p className="user_name">{name ?? ""}</p>
                            <button
                                type="button"
                                className="_close_btn"
                                aria-label="메뉴 닫기"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                닫기
                            </button>
                        </div>
                        <ul className="header_mobile_menu">
                            {menuItems.map((item) => (
                                <li
                                    key={item.to}
                                    className={`_menu_box ${item.active ? "on" : ""}`}
                                >
                                    <Link
                                        to={item.to}
                                        className="_menu_link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="_panel_footer">
                            <CommonBtn
                                type="button"
                                onClick={handleLogout}
                                text="로그아웃"
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
