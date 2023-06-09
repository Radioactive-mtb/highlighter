import  React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import "./Date.css";


const DateDisplay = () => {
    const [date, setDate] = useState(new Date());
    const day = dayjs(date).format("DD");
    const formattedDate = dayjs(date).format("MMMM YYYY");
  
    useEffect(() => {
        var changeTime = setInterval(()=>setDate(new Date()), 1000 )
        return function changeTimer() {
            clearInterval(changeTime)
        }
    })

    return (
      <div className="row date-display text-center">
        <div className='col'>{day} | {formattedDate}</div>
      </div>
    );
  };
  
  export default DateDisplay;
  