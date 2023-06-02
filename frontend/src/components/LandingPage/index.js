import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotGrid from './SpotGrid';
import { loadSpots } from "../../store/spots";
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);

  useEffect(() => {
    dispatch(loadSpots());
  }, [dispatch]);
  
  return (
    spots && <SpotGrid spots={spots} />
  );

}

export default LandingPage;