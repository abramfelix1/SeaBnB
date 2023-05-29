import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/Modals/Forms/LoginForm";
import SignupFormPage from "./components/Modals/Forms/SignupForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import SpotsList from "./components/Spots/SpotsList";
import SpotDetails from "./components/SpotDetails/SpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SpotsList />
          </Route>
          <Route exact path="/spots/:id">
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
