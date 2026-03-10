import { useState } from "react";
import { useParams } from "react-router-dom";
import TaskDate from "./components/TaskDate";
import TaskInput from "./components/TaskInput";
import TaskState from "./components/TaskState";
import CommonBtn from "../../components/CommonBtn";
import { updateTask } from "../../features/task/api";
import TaskTextarea from "./components/TaskTextarea";

function TaskView() {
    const { id } = useParams<{ id: string }>();
    const [status, setStatus] = useState("request");
    const [importance] = useState("low");
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
    return (
        <>
            <div className="task_view_top_btn_layout">
                <CommonBtn text="뒤로가기" btnClass="-cancel"/>
                <CommonBtn text="목록" />
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
                                        label="제목"
                                        placeholder="제목 입력"
                                        errorMsg="필수값입니다."
                                        value="123"
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <TaskInput
                                        mode="view"
                                        type="text"
                                        label="작성자"
                                        placeholder="제목 입력"
                                        value="123"
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <TaskInput
                                        mode="view"
                                        type="text"
                                        label="팀이름"
                                        placeholder="제목 입력"
                                        errorMsg="필수값입니다."
                                        value="123"
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <TaskInput
                                        mode="view"
                                        type="text"
                                        label="담당자"
                                        placeholder="제목 입력"
                                        value="123"
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <TaskDate mode="view" label="작성일" value="" />
                                </div>
                                <div className="_item_w_50">
                                    <TaskDate mode="view" label="마감일" value="" />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <label htmlFor="" className="_task_label">
                                        중요도
                                    </label>
                                    <TaskState
                                        states={importanceList}
                                        currentStatus={importance}
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
                            <div className="_item_flex _full_height_item">
                                <TaskTextarea mode="view" value="" />                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TaskView;
