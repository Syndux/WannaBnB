import React from "react";
import { Link } from "react-router-dom";

const SpotTile = ({ spot, manage }) => {
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
      {manage && (
        <div className="spot-tile-manage-container">
          <Link to={`/spots/${spot.id}/edit`}>
            <button>
              Update
            </button>
          </Link>
          <button onClick={(e) => {e.stopPropagation()}}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotTile;
