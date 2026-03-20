import CommonBtn from "../../components/CommonBtn";
import Pagenation from "../common/Pagenation";
import TaskTable from "./components/TaskTable";
import Loading from "../common/loading";
import { useTasks } from "./features/useTasks";
import type { Task } from "../../features/task/task";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";

const ITEMS_PER_PAGE = 25;

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
    const name = useAuthStore((state) => state.name);
    
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    const tab: "all" | "mine" = tabParam === "mine" ? "mine" : "all";
    
    const pageParam = searchParams.get("page");
    const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
    
    const { tasks, isLoading } = useTasks();

    if (isLoading) {
        return <Loading />;
    }

    const filteredTasks =
        tab === "all" || !name
            ? tasks
            : tasks.filter((task) => task.assigneeId === name);

    const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
    const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
    
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    const rows = paginatedTasks.map((task, i) => taskToRow(task, startIndex + i));

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(location.search);
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", String(page));
        }
        const queryString = params.toString();
        navigate(`/task${queryString ? `?${queryString}` : ""}`);
    };

    const handleTabChange = (newTab: "all" | "mine") => {
        if (newTab === "all") {
            navigate("/task");
        } else {
            navigate("/task?tab=mine");
        }
    };

    return (
        <>
            <div className="task_list_top">
                <div className="tab_btn_layout">
                    <div className={`_btn ${tab === "all" ? "on" : ""}`}>
                        <CommonBtn
                            text="전체"
                            onClick={() => handleTabChange("all")}
                        />
                    </div>
                    <div className={`_btn ${tab === "mine" ? "on" : ""}`}>
                        <CommonBtn
                            text="내 업무"
                            onClick={() => handleTabChange("mine")}
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
            <Pagenation
                currentPage={validCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default TaskList;
