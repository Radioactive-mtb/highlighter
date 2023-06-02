import  React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const DateDisplay = () => {
    const [date, setDate] = useState(new Date());
    const formattedDate = dayjs(date).format("dddd, D MMMM, YYYY");
  
    useEffect(() => {
        var changeTime = setInterval(()=>setDate(new Date()), 1000 )
        return function changeTimer() {
            clearInterval(changeTime)
        }
    })

    return (
      <div className="date-display p-3 text-center bg-light">
        <h1>Today </h1>
        <h3>{formattedDate}</h3>
      </div>
    );
  };
  
  export default DateDisplay;
  