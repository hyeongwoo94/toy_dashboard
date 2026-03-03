import { useAuthStore } from "../features/auth/authStore";
import Header from "./layout/header";
import SideBar from "./layout/sideBar";

function Index() {
    return (
        <>
            <Header />
            <div className="main_layout">
                <SideBar />
                <div className="change_content">
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                    <p style={{fontSize:"100px"}}>안녕</p>
                </div>
            </div>
        </>
    );
}

export default Index;