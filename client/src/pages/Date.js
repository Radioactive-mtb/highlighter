import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './Date.css';

const DateDisplay = () => {
  const [date, setDate] = useState(new Date());
  const day = dayjs(date).format('MM');
  const formattedDate = dayjs(date).format('MMMM YYYY');

  useEffect(() => {
    var changeTime = setInterval(() => setDate(new Date()), 1000);
    return function changeTimer() {
      clearInterval(changeTime);
    };
  }, []);

  return (
    <div className="row date-display p-3 text-center">
      <div className="col">
        {day} | {formattedDate}
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '200px', height: '200px' }} />
      </div>
    </div>
  );
};

export default DateDisplay;

