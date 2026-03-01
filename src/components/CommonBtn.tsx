// 텍스트랑 클래스 부모에서 전달 (예: common_btn, common_btn -cancel)
interface CommonBtnProps {
    text: string;
    btnClass?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function CommonBtn({ text, btnClass = "", type = "button", onClick }: CommonBtnProps) {
    return (
        <button type={type} className={`common_btn ${btnClass}`} onClick={onClick}>
            {text}
        </button>
    );
}

export default CommonBtn;
