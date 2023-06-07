const { AuthenticationError } = require("apollo-server-express");
const { User, Event } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("events");
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate("events");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("events");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    events: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Event.find(params);
    },
    event: async (parent, { eventId }) => {
      return Event.findOne({ eventId });
    },
  },

  Mutation: {
    addUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addEvent: async (parent, { title, start, end }, context) => {
      if (context.user) {
        const event = await Event.create({
          title,
          start,
          end,
          eventAuthor: context.user.email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { events: event._id } }
        );
        return event;
      }
    },
    removeEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({
          _id: eventId,
          eventAuthor: context.user.email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: event._id } }
        );
        return event;
      }
    },
  },
};

module.exports = resolvers;
