import React from "react";

import * as SpotImages from "./SpotImages";

const SpotTile = ({ spot }) => {
  const imageSource = SpotImages[`spotImg${spot.id}Prev`];

  return (
    <div className="spot-tile">
      <div className="spot-thumbnail">
        <img
          src={imageSource}
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
            {spot.avgRating || "New"}
          </span>
        </div>
        <div className="spot-price">${spot.price}/night</div>
      </div>
    </div>
  );
};

export default SpotTile;
