import CommonTextarea from "../../../components/CommonTextarea";

type TaskTextareaProps = {
    /** 'view'면 값만 p/div로 표시, 'edit' 또는 없으면 textarea 표시 (생성/수정) */
    mode?: "edit" | "view";
    value?: string;
};

function TaskTextarea(props: TaskTextareaProps) {
    const { mode = "edit", value = "" } = props;

    return (
        <>
            <label htmlFor="" className="_task_label">
                내용
            </label>
            {mode === "view" ? (
                <div className="task_edit_textarea_view _view_text">
                    {value || <p className="empty_text">작성된 내용이 없습니다.</p>}
                </div>
            ) : (
                <div className="task_edit_textarea">
                    <CommonTextarea />
                </div>
            )}
        </>
    );
}

export default TaskTextarea;