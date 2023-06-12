import "./Profile.css";
//import DateDisplay from "./Date";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";
import { ADD_EVENT, REMOVE_EVENT } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { loggedIn, getProfile } from "../utils/auth";
const localizer = momentLocalizer(moment);

const Profile = (props) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState("events");
  const [eventMutation, { error }] = useMutation(ADD_EVENT);
  const [removeEvent] = useMutation(REMOVE_EVENT);

  const addEventCalendar = async (event) => {
    event.preventDefault();
    console.log(newEvent);
    try {
      const { data } = eventMutation({
        variables: {
          ...newEvent,
        },
      });
    } catch (e) {
      console.error(e);
    }
    setAllEvents([...allEvents, newEvent]);

    setNewEvent({
      title: "",
      start: "",
      end: "",
    });
    window.location.reload();
  };

  const selectEvent = async (event) => {
    console.log(event, "Event data");
  };

  const deleteEvent = (event) => {
    const { data } = removeEvent({
      variables: { eventId: event._id },
    });
    window.location.reload();
  };

  const { email: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });

  const user = data?.me || data?.user || {};
  if (loggedIn() && getProfile().data.email === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.email) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="Profile">
      <h2 className="my-calendar">My Calendar</h2>
      <aside className="date-picker">
        <div className="event-title">Add Your Event</div>
        <input
          type="text"
          placeholer="Add Title"
          style={{ width: "60%", margin: "20px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        ></input>
        <DatePicker
          placeholderText="Start Date"
          style={{ width: "60%", margin: "20px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          style={{ width: "60%" }}
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button
          style={{ width: "60%", margin: "20px" }}
          onClick={addEventCalendar}
          className="button-74"
        >
          Add Event
        </button>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </aside>
      <Calendar
        className=" react-calendar"
        localizer={localizer}
        events={user.events.map((evt) => {
          return { ...evt, start: new Date(evt.start), end: new Date(evt.end) };
        })}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={selectEvent}
        onDoubleClickEvent={deleteEvent}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Profile;
