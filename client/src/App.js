import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { loggedIn, logout } from "./utils/auth";

import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DateDisplay from "./pages/Date";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <ul className="nav-bar row">
            <li className="col">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            {!loggedIn() ? (
              <>
                <li className="col">
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="col">
                  <Link className="link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="col">
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <li className="col">
                <a href="/#" className="link" onClick={logout}>
                  Log Out
                </a>
              </li>
            )}
          </ul>
          <DateDisplay></DateDisplay>

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
