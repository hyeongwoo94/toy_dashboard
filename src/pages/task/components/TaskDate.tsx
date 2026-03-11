import CommonDatePicker from "../../../components/CommonDatepicker";

type TaskDateProps = {
    mode?: "edit" | "view";
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
};

function TaskDate(props: TaskDateProps) {
    const { mode = "edit", label = "", value = "", onChange } = props;
    return (
        <>
            <label htmlFor="" className="_task_label">
                {label}
            </label>
            {mode === "view" ? (
                <p className="_view_text">{value != null && String(value).trim() !== "" ? String(value) : "-"}</p>
            ) : (
                <CommonDatePicker value={value} onChange={onChange} />
            )}
        </>
    );
}

export default TaskDate;
