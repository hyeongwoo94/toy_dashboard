import { useState } from "react";

function SideBar() {
    const [menuWidth, setmenuWidth] = useState(250); // 열린 기본 너비 (px)

    function slideToggle() {
        setmenuWidth((prev) => (prev === 0 ? 250 : 0));
    }

    return (
        <>
            <div className="side_bar" style={{ width: `${menuWidth}px` }}>
                <button type="button" onClick={slideToggle}>
                    {menuWidth === 0 ? "열기" : "닫기"}
                </button>
                <ul>
                    <li>123</li>
                    <li>123</li>
                    <li>123</li>
                </ul>
            </div>
        </>
    );
}

export default SideBar;