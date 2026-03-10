import CommonDatePicker from "../../../components/CommonDatepicker";

type TaskDateProps = React.ComponentProps<typeof CommonDatePicker> & {
    /** 'view'면 값만 p태그로 표시, 'edit' 또는 없으면 input 표시 (생성/수정) */
    mode?: "edit" | "view";
    label?: string;
    value?: string;
};

function TaskDate(props: TaskDateProps) {
    const { mode = "edit", label = "", value = "" } = props;
    return (
        <>
            <label htmlFor="" className="_task_label">
                {label}
            </label>
            {mode === "view" ? (
                <p className="_view_text">{value || "-"}</p>
            ) : (
                <CommonDatePicker />
            )}
        </>
    );
}

export default TaskDate;
