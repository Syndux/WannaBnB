import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSpotDetails } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import SpotImages from "./SpotImages";
import SpotDesc from "./SpotDesc";
import SpotReserve from "./SpotReserve";
import SpotReviews from "./SpotReviews";
import "./SpotDetails.css";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const spot = useSelector((state) => state.spots[id]);

  useEffect(() => {
    (async () => {
      await dispatch(getSpotDetails(id));
      if(spot && spot.numReviews) {
        await dispatch(getSpotReviews(id));
      }
      setIsLoaded(true);
    })();
  }, [dispatch, id]);
  
  return (
    isLoaded && (
      <div className="spot-details-container">
        <div className="spot-name">{spot.name}</div>
        <div className="spot-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>

        <SpotImages spot={spot} />

        <div className="spot-desc-reserve-container">
          <SpotDesc spot={spot} />
          <SpotReserve spot={spot} />
        </div>
        <div className="spot-reviews-container">
          <SpotReviews spot={spot} />
        </div>
      </div>
    )
  );
};

export default SpotDetails;
