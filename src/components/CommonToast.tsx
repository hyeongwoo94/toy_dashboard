import { useToastStore } from "../features/Common/toastStore";

function CommonToast() {
    const { isOpen, message, type, hide } = useToastStore();

    if (!isOpen) return null;

    return (
        <div className={`common_toast _${type}`} onClick={hide}>
            <p className="_message">{message}</p>
        </div>
    );
}

export default CommonToast;
