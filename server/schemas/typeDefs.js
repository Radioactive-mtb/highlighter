const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    events: [Event]!
  }

  type Event {
    _id: ID!
    title: String!
    start: String!
    end: String!
    eventAuthor: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    events(email: String): [Event!]
    event(eventId: ID!): Event
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEvent(title: String!, start: String!, end: String!): Event
    removeEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
