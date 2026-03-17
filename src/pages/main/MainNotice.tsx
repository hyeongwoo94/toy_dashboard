import CommonList from "../../components/CommonList";
import { mockNotice } from "../../features/notice/mockNotice";

const columns = [
    { label: "번호", width: "10%" },
    { label: "작성자", width: "15%" },
    { label: "제목" },
    { label: "날짜", width: "18%" },
];

const rows = mockNotice.map((notice) => ({
    to: `/notice/view/${notice.id}`,
    cells: [String(notice.id), notice.name, notice.title, notice.date],
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
