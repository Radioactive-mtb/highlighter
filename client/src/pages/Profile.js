import "./Profile.css";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { loggedIn, getProfile } from "../utils/auth";
const localizer = momentLocalizer(moment);

const Profile = (props) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState("events");
  const [eventMutation, { error }] = useMutation(ADD_EVENT);

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
      <h2 className="text-center">Add New Event</h2>
      <div className="text-center">
        <input
          type="text"
          placeholer="Add Title"
          style={{ width: "20%", margin: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        ></input>
        <DatePicker
          className="text-center"
          placeholderText="Start Date"
          style={{ margin: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          className="text-center"
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button style={{ margin: "10px" }} onClick={addEventCalendar}>
          Add Event
        </button>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </div>

      <Calendar
        localizer={localizer}
        events={user.events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default Profile;
