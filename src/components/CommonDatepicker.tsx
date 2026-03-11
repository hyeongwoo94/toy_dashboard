import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

/** YYYY-MM-DD ↔ Date 변환 */
function toDate(s: string | undefined): Date | null {
    if (!s || s.trim() === "") return null;
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d;
}
function toYYYYMMDD(d: Date | null): string {
    if (!d) return "";
    return d.toISOString().slice(0, 10);
}

interface CommonDatePickerProps {
    /** YYYY-MM-DD 형식. 없으면 비제어(내부 state) */
    value?: string;
    /** 날짜 변경 시 YYYY-MM-DD 문자열로 전달 */
    onChange?: (value: string) => void;
    /** input placeholder */
    placeholder?: string;
    /** 선택 가능 최소 날짜 (YYYY-MM-DD 또는 Date) */
    minDate?: string | Date;
    /** 선택 가능 최대 날짜 (YYYY-MM-DD 또는 Date) */
    maxDate?: string | Date;
    /** 비활성화 */
    disabled?: boolean;
    /** 표시 형식 (기본: yyyy-MM-dd). 예: yyyy.MM.dd, MM/dd/yyyy */
    dateFormat?: string;
}

function toDateOrNull(v: string | Date | undefined): Date | null {
    if (v == null) return null;
    if (v instanceof Date) return v;
    return toDate(v);
}

function CommonDatePicker(props: CommonDatePickerProps) {
    const {
        value,
        onChange,
        placeholder = "날짜 선택",
        minDate,
        maxDate,
        disabled = false,
        dateFormat = "yyyy-MM-dd",
    } = props;
    const [internalDate, setInternalDate] = useState<Date | null>(() => toDate(value) ?? new Date());

    const isControlled = value !== undefined;
    const selected = isControlled ? toDate(value) : internalDate;

    const handleChange = (date: Date | null) => {
        const str = toYYYYMMDD(date);
        if (!isControlled) setInternalDate(date);
        onChange?.(str);
    };

    return (
        <div className="common_input">
            <DatePicker
                className="_input"
                selected={selected}
                onChange={handleChange}
                dateFormat={dateFormat}
                placeholderText={placeholder}
                minDate={toDateOrNull(minDate) ?? undefined}
                maxDate={toDateOrNull(maxDate) ?? undefined}
                disabled={disabled}
            />
        </div>
    );
}

export default CommonDatePicker;