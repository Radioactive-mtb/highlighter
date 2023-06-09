import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      title
      start
      end
      eventAuthor
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      events {
        _id
        title
        start
        end
        eventAuthor
      }
    }
  }
`;
