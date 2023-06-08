import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/Modals/Forms/LoginForm";
import SignupFormPage from "./components/Modals/Forms/SignupForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import SpotsList from "./components/Spots/SpotsList";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateSpotForm from "./components/FormPages/CreateSpotForm";
import ManageSpot from "./components/CurrentUser/ManageSpot";
import EditSpotForm from "./components/FormPages/EditSpotForm";
import ManageReview from "./components/CurrentUser/ManageReview";

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
            <h1>TEST</h1>
            <SpotsList />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/current">
            <ManageSpot />
          </Route>
          <Route path="/spots/:id/edit">
            <EditSpotForm />
          </Route>
          <Route path="/spots/:id">
            <SpotDetails />
          </Route>
          <Route path="/reviews/current">
            <ManageReview />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
