import React, { useState } from "react";
import Calendar from "react-calendar";

const Profile = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar-block">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default Profile;
