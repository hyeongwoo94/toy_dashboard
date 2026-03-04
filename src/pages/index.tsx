import { useAuthStore } from "../features/auth/authStore";
import Header from "./layout/header";
import SideBar from "./layout/sideBar";

function Index() {
    return (
        <>
            <Header />
            <div className="main_wrap">
                <div className="main_grid">
                    <div className="main_grid_box _list">1</div>
                    <div className="main_grid_box _calender">2</div>
                    <div className="main_grid_box _myWork">3</div>
                    <div className="main_grid_box _notice_list">4</div>
                </div>
            </div>
        </>
    );
}

export default Index;