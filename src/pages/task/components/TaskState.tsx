interface StateItem {
    value: string;
    label: string;
}

interface TaskStateProps {
    states: StateItem[];
    currentStatus: string;
    onChange?: (value: string) => void;
    /** true면 클릭 불가 (view에서 중요도 등) */
    readOnly?: boolean;
}

function TaskState(props: TaskStateProps) {
    const { states, currentStatus, onChange, readOnly = false } = props;

    const handleClick = (value: string) => {
        if (readOnly) return;
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <ul className={`task_state_list ${readOnly ? "_readonly" : ""}`}>
            {states.map((state) => (
                <li key={state.value} className="task_state_item">
                    <button
                        type="button"
                        className={`_btn ${currentStatus === state.value ? state.value : ""}`}
                        onClick={() => handleClick(state.value)}
                        disabled={readOnly}
                    >
                        {state.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default TaskState;
