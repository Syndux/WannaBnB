import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotGrid from "../LandingPage/SpotGrid";
import { loadCurrentSpots } from "../../store/spots";
import "./OwnedSpots.css";

const OwnedSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(loadCurrentSpots());
  }, [dispatch]);

  return spots && (
    <SpotGrid spots={spots} />
  )
};

export default OwnedSpots;
