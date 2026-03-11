import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskDate from "./components/TaskDate";
import TaskInput from "./components/TaskInput";
import TaskState from "./components/TaskState";
import CommonBtn from "../../components/CommonBtn";
import { getTaskById, updateTask, deleteTask } from "../../features/task/api";
import { useModalStore } from "../../features/Common/modalStore";
import TaskTextarea from "./components/TaskTextarea";
import Loading from "../common/loading";
import type { Task } from "../../features/task/task";

function TaskView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("request");

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }
        getTaskById(id)
            .then((data) => {
                setTask(data);
                if (data) {
                    setStatus(data.status ?? "request");
                }
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    const stateList = [
        { value: "request", label: "요청" },
        { value: "in-progress", label: "진행" },
        { value: "review", label: "검토" },
        { value: "done", label: "완료" },
    ];
    const importanceList = [
        { value: "low", label: "낮음" },
        { value: "medium", label: "중간" },
        { value: "high", label: "높음" },
    ];

    const openModal = useModalStore((s) => s.open);

    const handleDelete = () => {
        if (!id) return;
        openModal({
            content: "정말 삭제하겠습니까?",
            onConfirmText: "삭제",
            onCancelText: "취소",
            onConfirm: () => {
                deleteTask(id).then(() => navigate("/task"));
            },
        });
    };

    if (isLoading) return <Loading />;
    if (!id || !task) return <p className="_view_text">해당 업무를 찾을 수 없습니다.</p>;

    return (
        <>
            <div className="task_view_top_btn_layout">
                <CommonBtn text="수정하기" btnClass="-cancel" onClick={() => id && navigate(`/task/edit/${id}`)} />
                <CommonBtn text="목록" onClick={() => navigate("/task")} />
                <CommonBtn text="삭제하기" btnClass="-cancel" onClick={handleDelete} />
            </div>
            <div className="task_edit">
                <div className="task_edit_wrap">
                    <form action="" className="task_edit_form">
                        <div className="task_item">
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <TaskInput
                                        mode="view"
                                        type="text"
                                        label="작성자"
                                        placeholder="제목 입력"
                                        value={task.authorId}
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <TaskInput
                                        mode="view"
                                        type="text"
                                        label="담당자"
                                        placeholder="제목 입력"
                                        value={task.assigneeId}
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <TaskDate mode="view" label="작성일" value={task.createdDay} />
                                </div>
                                <div className="_item_w_50">
                                    <TaskDate mode="view" label="마감일" value={task.doneDay} />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <label htmlFor="" className="_task_label">
                                        중요도
                                    </label>
                                    <TaskState
                                        states={importanceList}
                                        currentStatus={task.importStatus ?? "low"}
                                        readOnly
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <label htmlFor="" className="_task_label">
                                        상태
                                    </label>
                                    <TaskState
                                        states={stateList}
                                        currentStatus={status}
                                        onChange={(value) => {
                                            if (!id) return;
                                            setStatus(value);
                                            updateTask(id, { status: value as "request" | "in-progress" | "review" | "done" }).catch(() => {
                                                setStatus(status);
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_100">
                                    <TaskInput
                                        mode="view"
                                        type="text"
                                        label="제목"
                                        placeholder="제목 입력"
                                        errorMsg="필수값입니다."
                                        value={task.title}
                                    />
                                </div>
                            </div>
                            <div className="_item_flex _full_height_item">
                                <TaskTextarea mode="view" value={task.description} />                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TaskView;
