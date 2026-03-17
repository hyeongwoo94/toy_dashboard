import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'

type CalendarValue = Date | null

function MainCalender() {
    const [value, setValue] = useState<CalendarValue>(new Date())
    return (
        <>
            <div className='cus_calendar'>
                <Calendar
                    onChange={(val) => setValue(val as CalendarValue)}
                    value={value}
                    calendarType="gregory"
                    formatDay={(_locale, date) => date.getDate().toString()}
                    tileClassName={({ date }) => {
                        const day = date.getDay()
                        if (day === 0) return "sunday"
                        if (day === 6) return "saturday"
                      }}
                />
                <div className="cus_calendar_todo_box">
                    <div className='calendar_notice_box'>
                        <h4 className='_title'>생일축하</h4>
                        <ul className='_list'>
                            <li className='_item'>홍길동</li>
                            <li className='_item'>박길동</li>
                            <li className='_item'>최길동</li>
                            <li className='_item'>가길동</li>
                            <li className='_item'>남길동</li>
                            <li className='_item'>구길동</li>
                        </ul>
                    </div>
                    <div className='calendar_notice_box'>
                        <h4 className='_title'>Bigbro day</h4>
                        <ul className='_list'>
                            <li className='_item'>조기퇴근 데이</li>
                            <li className='_item'>회식</li>
                            <li className='_item'>전체 회의</li>
                            <li className='_item'>지각출근 데이</li>
                            <li className='_item'>칭찬 데이</li>
                            <li className='_item'>빡 집중데이</li>
                            <li className='_item'>너 나와</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainCalender;