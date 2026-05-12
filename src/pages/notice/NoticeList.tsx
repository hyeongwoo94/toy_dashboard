import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CommonBtn from "../../components/CommonBtn";
import Pagenation from "../common/Pagenation";
import TaskTable from "../task/components/TaskTable";
import { useNoticeStore } from "../../features/notice/noticeStore";
import { useAuthStore } from "../../features/auth/authStore";

const ITEMS_PER_PAGE = 25;

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

const columns = [
    { label: "번호", width: "7%" },
    { label: "제목" },
    { label: "작성자", width: "12%" },
    { label: "날짜/요일", width: "15%" },
    { label: "반복", width: "10%" },
];

function NoticeList() {
    const navigate = useNavigate();
    const location = useLocation();
    const role = useAuthStore((state) => state.role);
    const notices = useNoticeStore((state) => state.notices);

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("q") || "";
    const pageParam = searchParams.get("page");
    const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);

    const [searchInput, setSearchInput] = useState(searchQuery);

    // ID 내림차순 정렬
    const sortedNotices = [...notices].sort((a, b) => b.id - a.id);

    // 검색 필터링
    const filteredNotices = searchQuery.trim()
        ? sortedNotices.filter((notice) => {
              const query = searchQuery.toLowerCase();
              return (
                  notice.title.toLowerCase().includes(query) ||
                  notice.content.toLowerCase().includes(query) ||
                  notice.name.toLowerCase().includes(query)
              );
          })
        : sortedNotices;

    const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);
    const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedNotices = filteredNotices.slice(startIndex, endIndex);

    const rows = paginatedNotices.map((notice) => ({
        to: `/notice/view/${notice.id}`,
        cells: [
            String(notice.id),
            notice.title,
            notice.name,
            notice.isRecurring
                ? `매주 ${dayNames[notice.dayOfWeek]}요일`
                : (notice.date ?? dayNames[notice.dayOfWeek]),
            notice.isRecurring ? "O" : "-",
        ],
    }));

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(location.search);
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", String(page));
        }
        const queryString = params.toString();
        navigate(`/notice${queryString ? `?${queryString}` : ""}`);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchInput.trim()) {
            params.set("q", searchInput.trim());
        }
        const queryString = params.toString();
        navigate(`/notice${queryString ? `?${queryString}` : ""}`);
        setSearchInput("");
    };

    const handleReset = () => {
        setSearchInput("");
        navigate("/notice");
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
                    <div className="_search">
                        <input
                            type="text"
                            className="_search_input"
                            placeholder="제목, 내용, 작성자 검색"
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
                emptyMsg="등록된 공지사항이 없습니다."
            />
            <div className="task_list_bottom">
                <Pagenation
                    currentPage={validCurrentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                {role === "admin" && (
                    <CommonBtn
                        btnClass="add_task_btn"
                        text="공지사항 등록"
                        onClick={() => navigate("/notice/edit")}
                    />
                )}
            </div>
        </>
    );
}

export default NoticeList;
