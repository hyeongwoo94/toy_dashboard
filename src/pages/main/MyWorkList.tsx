import { Link } from "react-router-dom";
import CommonList from "../../components/CommonList";
const columns = [
    { label: "번호", width: "15%" },
    { label: "제목" },
    { label: "상태", width: "20%" },
];

const rows = [
    {
        to: "/",
        cells: [
            "1",
            "첫 번째 제목첫 번째 제목첫 번째 제목첫 번째 제목첫 번째 제목첫 번째 제목첫 번째 제목",
            "완료",
        ],
    },
    { to: "/", cells: ["2", "두 번째 제목",  "진행중"] },
    { to: "/", cells: ["3", "세 번째 제목",  "대기"] },
    { to: "/", cells: ["4", "네 번째 제목",  "완료"] },
    { to: "/", cells: ["4", "네 번째 제목",  "완료"] },
    { to: "/", cells: ["4", "네 번째 제목",  "완료"] },
];

function MyWorkList() {
    return (
        <>
            <div className="main_table_title_box">
                <h2 className="_title">내 업무</h2>
                <Link to ='' className="_btn">
                    더보기
                </Link>
            </div>
            <CommonList
                columns={columns}
                rows={rows}
                emptyMsg="업무가 없습니다. 팀장에게 문의하세요"
            />
        </>
    );
}

export default MyWorkList;
