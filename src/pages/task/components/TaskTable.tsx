import CommonList from "../../../components/CommonList";

function TaskTable(props: React.ComponentProps<typeof CommonList>) {
    return (
        <>
            <CommonList {...props} />
        </>
    );
}

export default TaskTable;
