import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotGrid from './SpotGrid';
import { loadAllSpots } from "../../store/spots";
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllSpots());
    setLoaded(true);
  }, [dispatch]);
  
  return (
    loaded && <SpotGrid spots={spots} />
  );

}

export default LandingPage;