import CommonDatePicker from "../../../components/CommonDatepicker";

function TaskDate() {
    return (
        <>
            <label htmlFor="" className="_task_label">
                시작일
            </label>
            <CommonDatePicker />
        </>
    );
}

export default TaskDate;
