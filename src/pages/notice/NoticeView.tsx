import { useParams } from "react-router-dom";
import { mockNotice } from "../../features/notice/mockNotice";

function NoticeView() {
    const { id } = useParams();
    const notice = mockNotice.find((n) => n.id === Number(id));

    if (!notice) {
        return <p>공지사항을 찾을 수 없습니다.</p>;
    }

    return (
        <>
            <div className="task_edit">
                <div className="task_edit_wrap">
                    <form action="" className="task_edit_form">
                        <div className="task_item">
                            <div className="_item_flex">
                                <div className="_item_w_100">
                                    <label htmlFor="" className="_task_label">
                                        제목
                                    </label>
                                    <p className="_view_text">{notice.title}</p>
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <label htmlFor="" className="_task_label">
                                        작성자
                                    </label>
                                    <p className="_view_text">{notice.name}</p>
                                </div>
                                <div className="_item_w_50">
                                    <label htmlFor="" className="_task_label">
                                        작성일
                                    </label>
                                    <p className="_view_text">{notice.date}</p>
                                </div>
                            </div>
                            <div className="_item_flex _full_height_item">
                                <label htmlFor="" className="_task_label">
                                    내용
                                </label>
                                <div className="task_edit_textarea_view">
                                    {notice.content}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NoticeView;
