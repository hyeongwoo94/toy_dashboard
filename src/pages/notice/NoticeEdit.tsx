import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonBtn from "../../components/CommonBtn";
import TaskInput from "../task/components/TaskInput";
import TaskTextarea from "../task/components/TaskTextarea";
import TaskDate from "../task/components/TaskDate";
import { useNoticeStore } from "../../features/notice/noticeStore";
import { useModalStore } from "../../features/Common/modalStore";
import { useToastStore } from "../../features/Common/toastStore";
import { useAuthStore } from "../../features/auth/authStore";

const dayOptions = [
    { value: 0, label: "일요일" },
    { value: 1, label: "월요일" },
    { value: 2, label: "화요일" },
    { value: 3, label: "수요일" },
    { value: 4, label: "목요일" },
    { value: 5, label: "금요일" },
    { value: 6, label: "토요일" },
];

function NoticeEdit() {
    const navigate = useNavigate();
    const currentUserName = useAuthStore((state) => state.name);
    const addNotice = useNoticeStore((state) => state.addNotice);
    const openModal = useModalStore((s) => s.open);
    const showToast = useToastStore((s) => s.show);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);

    // 선택한 날짜에서 요일 추출
    const getDayOfWeekFromDate = (dateStr: string): number => {
        if (!dateStr) return 1;
        const d = new Date(dateStr);
        return d.getDay();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            showToast("제목을 입력해주세요.", "error");
            return;
        }
        if (!date) {
            showToast("날짜를 선택해주세요.", "error");
            return;
        }
        if (!content.trim()) {
            showToast("내용을 입력해주세요.", "error");
            return;
        }

        const dayOfWeek = getDayOfWeekFromDate(date);

        openModal({
            content: "공지사항을 등록하시겠습니까?",
            onConfirmText: "등록",
            onCancelText: "취소",
            onConfirm: () => {
                const newNotice = addNotice({
                    title: title.trim(),
                    content: content.trim(),
                    dayOfWeek,
                    date: isRecurring ? undefined : date,
                    isRecurring,
                    name: currentUserName ?? "관리자",
                });
                showToast("공지사항이 등록되었습니다.", "success");
                navigate(`/notice/view/${newNotice.id}`);
            },
        });
    };

    return (
        <>
            <h2 className="task_edit_title">공지사항 등록</h2>
            <div className="task_edit">
                <div className="task_edit_wrap">
                    <form onSubmit={handleSubmit} className="task_edit_form">
                        <div className="task_item">
                            <div className="_item_flex">
                                <div className="_item_w_100">
                                    <TaskInput
                                        type="text"
                                        label="제목"
                                        placeholder="제목 입력"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_100">
                                    <TaskInput
                                        type="text"
                                        label="작성자"
                                        placeholder="작성자"
                                        value={currentUserName ?? "관리자"}
                                        mode="view"
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_100">
                                    <TaskDate
                                        label="날짜"
                                        value={date}
                                        onChange={(v) => setDate(v)}
                                    />
                                    <div className="repeat_day_checkbox">
                                        <label className="common_checkbox">
                                            <input
                                                type="checkbox"
                                                checked={isRecurring}
                                                onChange={(e) =>
                                                    setIsRecurring(
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                            <span className="_checkbox_text">
                                                매주{" "}
                                                {date
                                                    ? dayOptions[
                                                          getDayOfWeekFromDate(
                                                              date,
                                                          )
                                                      ].label
                                                    : "해당 요일"}{" "}
                                                반복
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="_item_flex _full_height_item">
                                <TaskTextarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="_btn_layout">
                                <CommonBtn type="submit" text="등록" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NoticeEdit;
