import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

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
    <>
      <div className="manage-spots-container">
        <h1>Manage Your Spots</h1>
        <NavLink to="/spots/new">
          <button className="manage-spots-create-spot-button">Create a New Spot</button>
        </NavLink>
      </div>
      <SpotGrid spots={spots} />
    </>
  )
};

export default ManageSpots;
