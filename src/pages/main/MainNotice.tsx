import CommonList from "../../components/CommonList";
import { mockNotice } from "../../features/notice/mockNotice";

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

const columns = [
    { label: "번호", width: "12%" },
    { label: "작성자", width: "15%" },
    { label: "제목" },
    { label: "요일", width: "10%" },
];

const rows = mockNotice.map((notice) => ({
    to: `/notice/view/${notice.id}`,
    cells: [
        String(notice.id),
        notice.name,
        notice.title,
        dayNames[notice.dayOfWeek],
    ],
}));

function MainNotice() {
    return (
        <>
            <div className="main_table_title_box">
                <h2 className="_title">공지사항</h2>
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
