import { Link } from "react-router-dom";
import CommonList from "../../components/CommonList";
import { useTasks } from "../task/features/useTasks";
import type { Task } from "../../features/task/task";

const columns = [
    { label: "번호", width: "10%" },
    { label: "제목" },
    { label: "작성자", width: "15%" },
    { label: "날짜", width: "18%" },
    { label: "상태", width: "15%" },
];

const statusLabel: Record<string, string> = {
    request: "요청",
    "in-progress": "진행",
    review: "검토",
    done: "완료",
};

function taskToRow(task: Task, index: number) {
    return {
        to: `/task/view/${task.id}`,
        cells: [
            String(index + 1),
            task.title,
            task.authorId,
            task.createdDay || "-",
            statusLabel[task.status ?? "request"] ?? task.status ?? "-",
        ],
    };
}

function MainList() {
    const { tasks } = useTasks();
    const rows = tasks.slice(0, 30).map((task, i) => taskToRow(task, i));

    return (
        <>
            <div className="main_table_title_box">
                <h2 className="_title">전체 업무</h2>
                <Link to="/task" className="_btn">
                    더보기
                </Link>
            </div>
            <CommonList
                columns={columns}
                rows={rows}
                emptyMsg="등록된 게시글이 없습니다."
            />
        </>
    );
}

export default MainList;
