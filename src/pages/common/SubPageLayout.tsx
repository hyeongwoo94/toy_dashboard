import { Outlet } from "react-router-dom";
import Header from "./Header";

function SubPageLayout() {
    return (
        <div className="sub_wrap">
            <Header />
            <div className="sub_layout">
                <div className="sub_content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default SubPageLayout;
