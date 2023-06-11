import React from "react";

const SpotTile = ({ spot }) => {
  return (
    <div className="spot-tile">
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
    </div>
  );
};

export default SpotTile;
