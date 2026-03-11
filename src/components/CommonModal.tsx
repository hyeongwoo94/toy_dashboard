import CommonBtn from "./CommonBtn";
import { useModalStore } from "../features/Common/modalStore";

function CommonModal() {
    const { isOpen, content, onConfirmText, onCancelText, onConfirm, onCancel, close } = useModalStore();

    if (!isOpen) return null;

    const handleCancel = () => {
        onCancel?.();
        close();
    };
    const handleConfirm = () => {
        onConfirm?.();
        close();
    };

    return (
        <div className="common_modal">
            <div className="_modal_bg">
                <div className="_content">
                    <p className="_content_text">
                        {content || "정말 삭제하겠습니까?"}
                    </p>
                    <div className="_content_btn_lsyout">
                        <CommonBtn text={onCancelText || "취소"} btnClass="-cancel" onClick={handleCancel} />
                        <CommonBtn text={onConfirmText || "확인"} onClick={handleConfirm} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommonModal;