import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useNoticeStore } from "../../features/notice/noticeStore";
import { mockBirthday } from "../../features/notice/mockBirthday";

type CalendarValue = Date | null;

// 날짜를 YYYY-MM-DD 형식으로 변환 (로컬 시간대 기준)
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

function MainCalender() {
    const [value, setValue] = useState<CalendarValue>(new Date());
    const notices = useNoticeStore((state) => state.notices);

    const selectedDayOfWeek = value ? value.getDay() : -1;
    const selectedDateStr = value ? formatDate(value) : "";

    // 선택한 날짜에 해당하는 공지사항 필터링
    // 1) 반복 공지: 요일이 같으면 표시
    // 2) 단일 날짜 공지: 날짜가 같으면 표시
    const filteredNotices = notices.filter((notice) => {
        if (notice.isRecurring) {
            return notice.dayOfWeek === selectedDayOfWeek;
        } else {
            return notice.date === selectedDateStr;
        }
    });

    const filteredBirthdays = mockBirthday.filter(
        (birthday) => birthday.dayOfWeek === selectedDayOfWeek,
    );

    // 캘린더 타일에 표시할 공지사항 여부 확인
    const hasNoticeOnDate = (date: Date): boolean => {
        const dayOfWeek = date.getDay();
        const dateStr = formatDate(date);
        return notices.some((notice) => {
            if (notice.isRecurring) {
                return notice.dayOfWeek === dayOfWeek;
            } else {
                return notice.date === dateStr;
            }
        });
    };

    const birthdayDays = mockBirthday.map((birthday) => birthday.dayOfWeek);

    return (
        <>
            <div className="cus_calendar">
                <Calendar
                    onChange={(val) => setValue(val as CalendarValue)}
                    value={value}
                    calendarType="gregory"
                    formatDay={(_locale, date) => date.getDate().toString()}
                    tileClassName={({ date }) => {
                        const day = date.getDay();
                        const classes: string[] = [];
                        if (day === 0) classes.push("sunday");
                        if (day === 6) classes.push("saturday");
                        if (hasNoticeOnDate(date) || birthdayDays.includes(day))
                            classes.push("has-notice");
                        return classes.join(" ") || undefined;
                    }}
                />
                <div className="cus_calendar_todo_box">
                    <div className="calendar_notice_box">
                        <h4 className="_title">오늘 생일자</h4>
                        <ul className="_list">
                            {filteredBirthdays.length > 0 ? (
                                filteredBirthdays.map((birthday) => (
                                    <li key={birthday.id} className="_item">
                                        {birthday.name}
                                    </li>
                                ))
                            ) : (
                                <li className="_item _empty">
                                    해당 날짜에 생일자가 없습니다.
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="calendar_notice_box">
                        <h4 className="_title">Bigbro day</h4>
                        <ul className="_list">
                            {filteredNotices.length > 0 ? (
                                filteredNotices.map((notice) => (
                                    <li key={notice.id} className="_item">
                                        {notice.title}
                                    </li>
                                ))
                            ) : (
                                <li className="_item _empty">
                                    해당 날짜에 일정이 없습니다.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainCalender;
