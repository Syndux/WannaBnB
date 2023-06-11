import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotGrid from "../LandingPage/SpotGrid";
import { loadCurrentSpots } from "../../store/spots";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadCurrentSpots());
      setIsRendered(true);
    })();
  }, [dispatch]);

  return isRendered && (
    <SpotGrid spots={spots} />
  )
};

export default ManageSpots;
