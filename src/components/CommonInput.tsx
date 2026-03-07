//label이랑 placeholder,타입까지 성공메세지,에러메세지는 props로 관리해야한다.
interface CommonInputProps {
    type: string;
    label: string;
    placeholder: string;
    errorMsg?: string;
    successMsg?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** true일 때 에러 메시지에 on 클래스가 붙어 보입니다 */
    showError?: boolean;
}

function CommonInput({
    type,
    label,
    placeholder,
    errorMsg,
    successMsg,
    value,
    onChange,
    showError = false,
}: CommonInputProps) {
    return (
        <>
            <div className="common_input">
                <input
                    className="_input"
                    type={type}
                    aria-label={label}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <p
                    className={`input_status_text -error${showError ? " on" : ""}`}
                >
                    {errorMsg}
                </p>
                <p className="input_status_text -success">{successMsg}</p>
            </div>
        </>
    );
}

export default CommonInput;
