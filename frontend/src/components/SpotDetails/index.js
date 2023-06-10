import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSpotDetails } from "../../store/spots";
import SpotImages from "./SpotImages";
import SpotDesc from "./SpotDesc";
import SpotReserve from "./SpotReserve";
import "./SpotDetails.css";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots[id]);

  useEffect(() => {
    dispatch(getSpotDetails(id));
  }, [dispatch, id]);

  const reserveSpot = () => {
    alert("Feature coming soon");
  };

  return (
    spot.Owner && (
      <div className="spot-details-container">
        <div className="spot-name">{spot.name}</div>
        <div className="spot-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
        
        <SpotImages spot={spot} />

        <div className="spot-desc-reserve-container">
          <SpotDesc spot={spot} />
          <SpotReserve spot={spot} />
        </div>
        <div className="spot-reviews">

        </div>
      </div>
    )
    );
  };
  
  export default SpotDetails;
  

  // <div className="spot-description">{spot.description}</div>
  // <div className="spot-price">
  //   <span className="spot-price-value">${spot.price}</span>
  //   <span>night</span>
  // </div>
  // <button className="reserve-button" onClick={reserveSpot}>
  //   Reserve
  // </button>