import React from "react";
import { Link } from "react-router-dom";

const SpotTile = ({ spot }) => {
  const spotId = spot.id;

  return (
    <div className="spot-tile">
      <Link to={`/spots/${spotId}`} style={{"textDecoration" : "none", "color" : "black"}}>
        <div className="spot-thumbnail">
          <img
            src={spot.previewImage}
            alt="Spot Preview"
            className="spot-image"
            title={spot.name}
          />
        </div>
        <div className="spot-details">
          <div className="spot-location-rating">
            <div className="spot-city-state">{`${spot.city}, ${spot.state}`}</div>
            <span>
              <i className="fa-solid fa-star spot-rating" />
              {spot.avgRating
                ? spot.avgRating.toFixed(Number.isInteger(spot.avgRating) ? 1 : 2)
                : "New"}
            </span>
          </div>
          <div className="spot-price">
            <span className="spot-price-value">${spot.price} </span>
            <span>night</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpotTile;
