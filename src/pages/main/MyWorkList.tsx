import { Link } from "react-router-dom";
import CommonList from "../../components/CommonList";
import { useTasks } from "../task/features/useTasks";
import type { Task } from "../../features/task/task";
import { useAuthStore } from "../../features/auth/authStore";

const columns = [
    { label: "번호", width: "15%" },
    { label: "제목" },
    { label: "상태", width: "20%" },
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
            statusLabel[task.status ?? "request"] ?? task.status ?? "-",
        ],
    };
}

function MyWorkList() {
    const { tasks } = useTasks();
    const name = useAuthStore((state) => state.name);

    const myTasks = name
        ? tasks.filter((task) => task.assigneeId === name)
        : [];

    const rows = myTasks.slice(0, 30).map((task, i) => taskToRow(task, i));

    return (
        <>
            <div className="main_table_title_box">
                <h2 className="_title">내 업무</h2>
                <Link to="/task?tab=mine" className="_btn">
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
