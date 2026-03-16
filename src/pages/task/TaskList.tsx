import CommonBtn from "../../components/CommonBtn";
import Pagenation from "../common/Pagenation";
import TaskTable from "./components/TaskTable";
import Loading from "../common/loading";
import { useTasks } from "./features/useTasks";
import type { Task } from "../../features/task/task";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";

const columns = [
    { label: "번호", width: "7%" },
    { label: "제목" },
    { label: "내용", width: "40%" },
    { label: "작성자", width: "10%" },
    { label: "담당자", width: "10%" },
    { label: "날짜", width: "10%" },
    { label: "상태", width: "10%" },
];

const statusLabel: Record<string, string> = {
    request: "요청",
    "in-progress": "진행",
    review: "검토",
    done: "완료",
};

function taskToRow(task: Task, index: number) {
    const desc = task.description ?? "";
    const preview = desc.length > 50 ? `${desc.slice(0, 50)}...` : desc;
    return {
        to: `/task/view/${task.id}`,
        cells: [
            String(index + 1),
            task.title,
            preview,
            task.authorId,
            task.assigneeId,
            task.createdDay || "-",
            statusLabel[task.status ?? "request"] ?? task.status ?? "-",
        ],
    };
}

function TaskList() {
    const navigate = useNavigate();
    const location = useLocation();
    // 로그인된 사용자 이름 (담당자와 비교할 기준)
    const name = useAuthStore((state) => state.name);
    // URL 쿼리(tab)로부터 현재 탭 상태 계산: 기본값은 전체(all)
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    const tab: "all" | "mine" = tabParam === "mine" ? "mine" : "all";
    const { tasks, isLoading } = useTasks();

    if (isLoading) {
        return <Loading />;
    }

    // 탭과 로그인 이름에 따라 화면에 보여줄 업무 목록 필터링
    const visibleTasks =
        tab === "all" || !name
            ? tasks
            : tasks.filter((task) => task.assigneeId === name);

    const rows = visibleTasks.map((task, i) => taskToRow(task, i));

    return (
        <>
            <div className="task_list_top">
                <div className="tab_btn_layout">
                    <div className={`_btn ${tab === "all" ? "on" : ""}`}>
                        <CommonBtn
                            text="전체"
                            onClick={() => navigate("/task")}
                        />
                    </div>
                    <div className={`_btn ${tab === "mine" ? "on" : ""}`}>
                        <CommonBtn
                            text="내 업무"
                            onClick={() => navigate("/task?tab=mine")}
                        />
                    </div>
                </div>
                <CommonBtn btnClass="add_task_btn" text="업무 등록" onClick={() => navigate("/task/edit")} />
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
