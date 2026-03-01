//label이랑 placeholder,타입까지 성공메세지,에러메세지는 props로 관리해야한다.
interface CommonInputProps {
    type: string;
    label: string;
    placeholder: string;
    errorMsg: string;
    successMsg: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CommonInput({
    type,
    label,
    placeholder,
    errorMsg,
    successMsg,
    value,
    onChange,
}: CommonInputProps) {
    return (
        <>
            <div className="common_input">
                <input
                    className="-input"
                    type={type}
                    aria-label={label}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <p className="input_status_text -error">{errorMsg}</p>
                <p className="input_status_text -success">{successMsg}</p>
            </div>
        </>
    );
}

export default CommonInput;
