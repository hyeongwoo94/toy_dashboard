import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { mockNotice } from "../../features/notice/mockNotice";
import { mockBirthday } from "../../features/notice/mockBirthday";

type CalendarValue = Date | null;

function MainCalender() {
    const [value, setValue] = useState<CalendarValue>(new Date());

    const selectedDayOfWeek = value ? value.getDay() : -1;
    const filteredNotices = mockNotice.filter(
        (notice) => notice.dayOfWeek === selectedDayOfWeek,
    );
    const filteredBirthdays = mockBirthday.filter(
        (birthday) => birthday.dayOfWeek === selectedDayOfWeek,
    );

    const noticeDays = mockNotice.map((notice) => notice.dayOfWeek);
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
                        if (
                            noticeDays.includes(day) ||
                            birthdayDays.includes(day)
                        )
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
