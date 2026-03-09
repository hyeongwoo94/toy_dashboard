import Header from "./common/Header";
import MainCalender from "./main/MainCalender";
import MainList from "./main/MainList";
import MainNotice from "./main/MainNotice";
import MyWorkList from "./main/MyWorkList";

function Index() {
    return (
        <>
            <div className="main_wrap">
                <Header />
                <div className="main_grid">                    
                    <div className="main_grid_box _list">
                        <MainList/>
                    </div>
                    <div className="main_grid_box _calender">
                        <MainCalender />
                    </div>
                    <div className="main_grid_box _myWork">
                        <MyWorkList />
                    </div>
                    <div className="main_grid_box _notice_list">
                        <MainNotice />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;