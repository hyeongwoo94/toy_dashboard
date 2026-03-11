import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommonBtn from "../../components/CommonBtn";
import TaskDate from "./components/TaskDate";
import TaskInput from "./components/TaskInput";
import TaskState from "./components/TaskState";
import TaskTextarea from "./components/TaskTextarea";
import Loading from "../common/loading";
import { getTaskById, createTask, updateTask } from "../../features/task/api";
import type { Task } from "../../features/task/task";
import { useModalStore } from "../../features/Common/modalStore";

function TaskEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(!!id);
    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [assigneeId, setAssigneeId] = useState("");
    const [createdDay, setCreatedDay] = useState("");
    const [doneDay, setDoneDay] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Task["status"]>("request");
    const [importance, setImportance] = useState<Task["importStatus"]>("low");

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }
        getTaskById(id)
            .then((task) => {
                if (task) {
                    setTitle(task.title);
                    setAuthorId(task.authorId);
                    setAssigneeId(task.assigneeId);
                    setCreatedDay(task.createdDay ?? "");
                    setDoneDay(task.doneDay ?? "");
                    setDescription(task.description ?? "");
                    setStatus((task.status ?? "request") as Task["status"]);
                    setImportance((task.importStatus ?? "low") as Task["importStatus"]);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title,
            createdDay,
            doneDay,
            description,
            status,
            importStatus: importance,
            authorId: authorId || "1",
            assigneeId: assigneeId || "1",
        };
        openModal({
            content: id ? "수정 내용을 저장하시겠습니까?" : "업무를 등록하시겠습니까?",
            onConfirmText: "저장",
            onCancelText: "취소",
            onConfirm: () => {
                if (id) {
                    updateTask(id, payload).then(() => navigate(`/task/view/${id}`));
                } else {
                    createTask(payload).then((created) => navigate(`/task/view/${created.id}`));
                }
            },
        });
    };

    if (isLoading) return <Loading />;

    return (
        <>
            <h2 className="task_edit_title">{id ? "업무 수정" : "업무 요청"}</h2>
            <div className="task_edit">
                <div className="task_edit_wrap">
                    <form onSubmit={handleSubmit} className="task_edit_form">
                        <div className="task_item">
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <TaskInput
                                        type="text"
                                        label="작성자"
                                        placeholder="작성자 입력"
                                        value={authorId}
                                        onChange={(e) => setAuthorId(e.target.value)}
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <TaskInput
                                        type="text"
                                        label="담당자"
                                        placeholder="담당자 입력"
                                        value={assigneeId}
                                        onChange={(e) => setAssigneeId(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <TaskDate label="작성일" value={createdDay} />
                                </div>
                                <div className="_item_w_50">
                                    <TaskDate label="마감일" value={doneDay} />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <label htmlFor="" className="_task_label">
                                        중요도
                                    </label>
                                    <TaskState
                                        states={importanceList}
                                        currentStatus={importance ?? "low"}
                                        onChange={(value) => setImportance(value as Task["importStatus"])}
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <label htmlFor="" className="_task_label">
                                        상태
                                    </label>
                                    <TaskState
                                        states={stateList}
                                        currentStatus={status ?? "request"}
                                        onChange={(value) => setStatus(value as Task["status"])}
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_100">
                                    <TaskInput
                                        type="text"
                                        label="제목"
                                        placeholder="제목 입력"
                                        errorMsg="필수값입니다."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="_item_flex _full_height_item">
                                <TaskTextarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="_btn_layout">
                                <CommonBtn type="submit" text="저장" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TaskEdit;
