import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function CommonDatePicker(){
    const [date, setDate] = useState(new Date());
    return(
        <>
        <div className="common_input">
            <DatePicker
                className="_input"
                selected={date}
                onChange={(date:any) => setDate(date)}
            />
        </div>            
        </>
    )
}

export default CommonDatePicker