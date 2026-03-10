import CommonBtn from "../../components/CommonBtn";
import Pagenation from "../common/Pagenation";
import TaskTable from "./components/TaskTable";

const columns = [
    { label: "번호", width: "7%" },
    { label: "제목" },
    { label: "내용", width: "40%" },
    { label: "작성자", width: "10%" },
    { label: "담당자", width: "10%" },
    { label: "날짜", width: "10%" },
    { label: "상태", width: "10%" },
];

const rows = [
    {
        to: "/",
        cells: [
            "1",
            "첫 번째 제목첫 ",
            "내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기",
            "홍길동",
            "박일꾼",
            "2025-03-01",
            "완료",
        ],
    },
    {
        to: "/",
        cells: [
            "2",
            "두 번째 제목",
            "내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기",
            "김철수",
            "박일꾼",
            "2025-03-02",
            "진행중",
        ],
    },
    {
        to: "/",
        cells: [
            "3",
            "세 번째 제목",
            "내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기",
            "이영희",
            "박일꾼",
            "2025-03-03",
            "대기",
        ],
    },
    {
        to: "/",
        cells: [
            "4",
            "네 번째 제목",
            "내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기내용미리보기",
            "박민수",
            "박일꾼",
            "2025-03-04",
            "완료",
        ],
    },
];

function TaskList() {
    return (
        <>
            {/* 탭은 on으로 관리? */}
            <div className="tab_btn_layout">
                <div className="_btn on">
                    <CommonBtn text="전체" />
                </div>
                <div className="_btn">
                    <CommonBtn text="내 업무" />
                </div>
            </div>
            <TaskTable
                columns={columns}
                rows={rows}
                emptyMsg="등록된 게시글이 없습니다."
            />
            <Pagenation />
        </>
    );
}

export default TaskList;
