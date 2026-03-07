import { useState } from "react";
import TaskDate from "./components/TaskDate";
import TaskInput from "./components/TaskInput";
import TaskState from "./components/TaskState";
import CommonTextarea from "../../components/CommonTextarea";

function TaskView() {
    const [status, setStatus] = useState("request");
    const [importance, setImportance] = useState("low");
    const stateList = [
        { value: "request", label: "요청" },
        { value: "prgress", label: "진행" },
        { value: "review", label: "검토" },
        { value: "complete", label: "완료" },
    ];
    const importanceList = [
        { value: "low", label: "낮음" },
        { value: "medium", label: "중간" },
        { value: "high", label: "높음" },
    ];
    return (
        <>
            {/* 뒤로가기 목록으로가기 버튼 추가하자. */}
            <div className="task_edit">
                <div className="task_edit_wrap">
                    <form action="" className="task_edit_form">
                        <div className="task_item">
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <TaskInput
                                        type="text"
                                        label="제목"
                                        placeholder="제목 입력"
                                        errorMsg="필수값입니다."
                                        value="123"
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <TaskInput
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
                                        type="text"
                                        label="팀이름"
                                        placeholder="제목 입력"
                                        errorMsg="필수값입니다."
                                        value="123"
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <TaskInput
                                        type="text"
                                        label="담당자"
                                        placeholder="제목 입력"
                                        value="123"
                                    />
                                </div>
                            </div>
                            <div className="_item_flex">
                                <div className="_item_w_50">
                                    <TaskDate />
                                </div>
                                <div className="_item_w_50">
                                    <TaskDate />
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
                                        onChange={(value) =>
                                            setImportance(value)
                                        }
                                    />
                                </div>
                                <div className="_item_w_50">
                                    <label htmlFor="" className="_task_label">
                                        상태
                                    </label>
                                    <TaskState
                                        states={stateList}
                                        currentStatus={status}
                                        onChange={(value) => setStatus(value)}
                                    />
                                </div>
                            </div>
                            <div className="_item_flex _full_height_item">
                                <label htmlFor="" className="_task_label">
                                    내용
                                </label>
                                <div className="task_edit_textarea">
                                    <CommonTextarea />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TaskView;
