import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($title: String!, $start: String!, $end: String!) {
    addEvent(title: $title, start: $start, end: $end) {
      _id
      title
      start
      end
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
      _id
    }
  }
`;
