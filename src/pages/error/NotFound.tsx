import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="page_404">
            <div className="page_404_wrap">
                <h2 className="page_404_title">
                    404
                </h2>
                <div className="page_404_text_box common_list_flex">
                    <h5>이 페이지를 표시 할 수 없습니다.</h5>
                    <p>고객센터에 문의 하세요</p>
                    <div className="btn_layout">
                        <Link to="/">메인으로 돌아가기</Link>
                        <a href="mailto:guddn0625@gmail.com">고객센터</a>
                    </div>
                </div> 
            </div>           
        </div>
    );
}

export default NotFound;
