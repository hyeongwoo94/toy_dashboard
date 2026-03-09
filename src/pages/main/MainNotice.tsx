import { Link } from "react-router-dom";
import CommonList from "../../components/CommonList";
const columns = [
    { label: "번호", width: "10%" },
    { label: "제목" },
    { label: "날짜", width: "18%" },
];

const rows = [
    {
        to: "/",
        cells: [
            "1",
            "첫 번째 제목첫 번째 제목첫 번째 제목첫 번째 제목첫 번째 제목첫 번째 제목첫 번째 제목",
            "2025-03-01",
        ],
    },
    { to: "/", cells: ["2", "두 번째 제목", "2025-03-02"] },
    { to: "/", cells: ["3", "세 번째 제목", "2025-03-03"] },
    { to: "/", cells: ["4", "네 번째 제목", "2025-03-04"] },
    { to: "/", cells: ["4", "네 번째 제목", "2025-03-04"] },
    { to: "/", cells: ["4", "네 번째 제목", "2025-03-04"] },
];

function MainNotice() {
    return (
        <>
            <div className="main_table_title_box">
                <h2 className="_title">공지사항</h2>
                <Link to ='' className="_btn">
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
