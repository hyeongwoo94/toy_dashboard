// 텍스트랑 클래스 부모에서 전달 (예: common_btn, common_btn -cancel)
interface CommonBtnProps {
    text: string;
    btnClass?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function CommonBtn({ text, btnClass = "", onClick }: CommonBtnProps) {
    return (
        <button type="button" className={`common_btn ${btnClass}`} onClick={onClick}>
            {text}
        </button>
    );
}

export default CommonBtn;
