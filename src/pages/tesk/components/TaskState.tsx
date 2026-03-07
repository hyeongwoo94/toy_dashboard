interface StateItem {
    value: string;
    label: string;
}

interface TaskStateProps {
    states: StateItem[];
    currentStatus: string;
    onChange?: (value: string) => void;
}

function TaskState(props: TaskStateProps) {
    const { states, currentStatus, onChange } = props;

    const handleClick = (value: string) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <ul className="task_state_list">
            {states.map((state) => (
                <li key={state.value} className="task_state_item">
                    <button
                        type="button"
                        className={`_btn ${currentStatus === state.value ? state.value : ""}`}
                        onClick={() => handleClick(state.value)}
                    >
                        {state.label}
                    </button>
                </li>
            ))}
        </ul>
        // view에서는 하나만 보여줄거야.
    );
}

export default TaskState;
