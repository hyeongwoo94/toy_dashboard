import CommonList from "../../components/CommonList";
import { useNoticeStore } from "../../features/notice/noticeStore";
import { Link } from "react-router-dom";

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

const columns = [
    { label: "번호", width: "12%" },
    { label: "작성자", width: "15%" },
    { label: "제목" },
    { label: "요일", width: "10%" },
];

function MainNotice() {
    const notices = useNoticeStore((state) => state.notices);

    // ID 내림차순 정렬 (최신이 위로)
    const sortedNotices = [...notices].sort((a, b) => b.id - a.id);

    const rows = sortedNotices.map((notice) => ({
        to: `/notice/view/${notice.id}`,
        cells: [
            String(notice.id),
            notice.name,
            notice.title,
            dayNames[notice.dayOfWeek],
        ],
    }));

    return (
        <>
            <div className="main_table_title_box">
                <h2 className="_title">공지사항</h2>
                <Link to="/notice" className="_btn">
                    더보기
                </Link>
            </div>
            <CommonList
                columns={columns}
                rows={rows}
                emptyMsg="공지사항이 없습니다."
            />
        </>
    );
}

export default MainNotice;
