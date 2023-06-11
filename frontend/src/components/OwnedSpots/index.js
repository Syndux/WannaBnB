import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotGrid from "../LandingPage/SpotGrid";
import { loadCurrentSpots } from "../../store/spots";
import "./OwnedSpots.css";

const OwnedSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadCurrentSpots());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return spots && isLoaded && (
    <SpotGrid spots={spots} />
  )
};

export default OwnedSpots;
