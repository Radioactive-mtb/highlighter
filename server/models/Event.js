const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  eventAuthor: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;
