import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotForm from "./components/SpotForm";
import ManageSpots from "./components/ManageSpots";
import SpotDetails from "./components/SpotDetails";
import ManageReviews from "./components/ManageReviews";
import AboutTheDev from "./components/AboutTheDev";

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
        <>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/spots/new">
              <SpotForm isEdit={false} />
            </Route>
            <Route path="/spots/owned">
              <ManageSpots />
            </Route>
            <Route path="/spots/:id/edit">
              <SpotForm isEdit={true} />
            </Route>
            <Route path="/spots/:id">
              <SpotDetails />
            </Route>
            <Route path="/reviews/current">
              <ManageReviews />
            </Route>
            <Route exact path="/about-dev">
              <AboutTheDev />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
