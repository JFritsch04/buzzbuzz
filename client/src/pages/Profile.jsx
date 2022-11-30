import { useState, useEffect } from "react";
import { useAppContext } from "../utils/AppContext";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Warning from "../components/Alert";

const User = (props) => {
  const { appState, setAppState } = useAppContext();
  // id is the name of the wildcard variable we specified in the route in App.js
  const { id } = useParams();

  const fetchUser = async () => {
    const lookupQuery = await fetch(`/api/user/${id}`);
    const parsedResponse = await lookupQuery.json();
    if (parsedResponse.result === "success") {
      setAppState({ user: parsedResponse.payload });
    }
    console.log(appState.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!appState.user) {
    return <Warning />;
  } else {
    return (
      <Container style={{ paddingTop: "1em" }}>
        {!appState.user ? (
          <p>We could not find the user you were seeking.</p>
        ) : (
          <div>
            <h1>Welcome to your profile page, {appState.user.username} </h1>
            <p>Details:</p>
          </div>
        )}
      </Container>
    );
  }
};

export default User;
