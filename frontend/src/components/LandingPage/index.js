import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotGrid from './SpotGrid';
import { loadAllSpots } from "../../store/spots";
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(loadAllSpots());
  }, [dispatch]);
  
  return (
    spots && <SpotGrid spots={spots} />
  );

}

export default LandingPage;