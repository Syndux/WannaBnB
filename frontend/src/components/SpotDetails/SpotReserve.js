import React from "react";
import SpotImages from "./SpotImages";

const SpotReserve = ({ spot }) => {
  const reserveSpot = () => {
    alert("Feature coming soon");
  };

  return (
    <div className="spot-reserve-card">
      <div className="spot-reserve-info">
        <div className="spot-price">
          {`$${spot.price}`} <span className="spot-price-unit">night</span>
        </div>
        <div className="spot-avg-rating-container">
          <i className="fa-sharp fa-solid fa-star" />
          {" "}
          <span className="spot-avg-rating">
            {spot.avgStarRating
              ? spot.avgStarRating.toFixed(
                  Number.isInteger(spot.avgStarRating) ? 1 : 2
                )
              : "New"}
            {spot.numReviews ? " · " + `${spot.numReviews}` : ""}
            {spot.numReviews ? (spot.numReviews > 1 ? " reviews" :  " review") : ""}
          </span>
        </div>
      </div>
      <button onClick={reserveSpot} className="reserve-button">
        Reserve
      </button>
    </div>
  );
};

export default SpotReserve;
