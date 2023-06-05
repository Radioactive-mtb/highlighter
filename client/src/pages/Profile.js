import './Profile.css';
import React, {useState} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const localizer = momentLocalizer(moment);


const Profile = (props) => {

const[newEvent, setNewEvent] = useState({title: '', start: '',  end: ''});
const[allEvents, setAllEvents] = useState('events');

function addEventCalendar() {
  setAllEvents([...allEvents, newEvent])
};

  return (
    <div className='Profile'>
      <h2 className="text-center">Add New Event</h2>
      <div className="text-center">
        <input type="text" placeholer="Add Title" style={{width: "20%", margin: "10px"}}
        value={newEvent.title} onChange= {(e) => setNewEvent({...newEvent, title: e.target.value})}></input>
        <DatePicker className="text-center" placeholderText="Start Date" style={{margin: "10px"}} 
        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
        <DatePicker className="text-center" placeholderText="End Date"
        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
        <button style={{margin: "10px"}} onClick={addEventCalendar}>Add Event</button>
      </div>
      
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
    </div>
  );
}

export default Profile;
