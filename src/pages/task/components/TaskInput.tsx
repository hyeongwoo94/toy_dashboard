import CommonInput from "../../../components/CommonInput";

type TaskInputProps = React.ComponentProps<typeof CommonInput> & {
    /** 'view'면 값만 p태그로 표시, 'edit' 또는 없으면 input 표시 (생성/수정) */
    mode?: "edit" | "view";
};

function TaskInput(props: TaskInputProps) {
    const { mode = "edit", label, value = "", ...rest } = props;

    return (
        <>
            <label htmlFor="" className="_task_label">
                {label}
            </label>
            {mode === "view" ? (
                <p className="_view_text">{value}</p>
            ) : (
                <CommonInput {...rest} label={label} value={value} />
            )}
        </>
    );
}

export default TaskInput;
