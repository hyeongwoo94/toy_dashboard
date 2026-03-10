import CommonInput from "../../../components/CommonInput";

function TaskInput(props: React.ComponentProps<typeof CommonInput>) {
    return (
        <>
            <label htmlFor="" className="_task_label">
                {props.label}
            </label>
            <CommonInput {...props} />
            {/* <p className="_view_text">{props.value}</p> */}
        </>
    );
}

export default TaskInput;
