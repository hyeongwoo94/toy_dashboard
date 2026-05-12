import { useState } from "react";
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
    const searchQuery = searchParams.get("q") || "";

    const pageParam = searchParams.get("page");
    const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);

    const [searchInput, setSearchInput] = useState(searchQuery);

    const { tasks, isLoading } = useTasks();

    if (isLoading) {
        return <Loading />;
    }

    // 탭 필터링 (전체 / 내 업무)
    const tabFilteredTasks =
        tab === "all" || !name
            ? tasks
            : tasks.filter((task) => task.assigneeId === name);

    // 검색 필터링 (제목, 내용, 작성자, 담당자)
    const filteredTasks = searchQuery.trim()
        ? tabFilteredTasks.filter((task) => {
              const query = searchQuery.toLowerCase();
              return (
                  task.title.toLowerCase().includes(query) ||
                  (task.description ?? "").toLowerCase().includes(query) ||
                  task.authorId.toLowerCase().includes(query) ||
                  task.assigneeId.toLowerCase().includes(query)
              );
          })
        : tabFilteredTasks;

    const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
    const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    const rows = paginatedTasks.map((task, i) =>
        taskToRow(task, startIndex + i),
    );

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
        const params = new URLSearchParams();
        if (newTab === "mine") {
            params.set("tab", "mine");
        }
        if (searchQuery) {
            params.set("q", searchQuery);
        }
        const queryString = params.toString();
        navigate(`/task${queryString ? `?${queryString}` : ""}`);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (tab === "mine") {
            params.set("tab", "mine");
        }
        if (searchInput.trim()) {
            params.set("q", searchInput.trim());
        }
        const queryString = params.toString();
        navigate(`/task${queryString ? `?${queryString}` : ""}`);
        setSearchInput("");
    };

    const handleReset = () => {
        setSearchInput("");
        const params = new URLSearchParams();
        if (tab === "mine") {
            params.set("tab", "mine");
        }
        const queryString = params.toString();
        navigate(`/task${queryString ? `?${queryString}` : ""}`);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
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
                    <div className="_search">
                        <input
                            type="text"
                            className="_search_input"
                            placeholder="검색어를 입력해주세요."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                        <CommonBtn
                            text="검색"
                            btnClass="_search_btn"
                            onClick={handleSearch}
                        />
                        <CommonBtn
                            text="초기화"
                            btnClass="_search_btn -cancel"
                            onClick={handleReset}
                        />
                    </div>
                </div>
            </div>
            <TaskTable
                columns={columns}
                rows={rows}
                emptyMsg="등록된 게시글이 없습니다."
            />
            <div className="task_list_bottom">
                <Pagenation
                    currentPage={validCurrentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <CommonBtn
                    btnClass="add_task_btn"
                    text="업무 등록"
                    onClick={() => navigate("/task/edit")}
                />
            </div>
        </>
    );
}

export default TaskList;
