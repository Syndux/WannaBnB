import React from "react";

const SpotReviews = ({ spot }) => {
  return (
    <div className="spot-reviews-avg-rating">
      <i className="fa-solid fa-star" />{" "}
      <span className="spot-reviews-avg-rating">
        {spot.avgStarRating
          ? spot.avgStarRating.toFixed(Number.isInteger(spot.avgStarRating) ? 1 : 2)
          : "New"}
        {spot.numReviews ? " · " + `${spot.numReviews}` : ""}
        {spot.numReviews ? (spot.numReviews > 1 ? " reviews" : " review") : ""}
      </span>
    </div>
  );
};

export default SpotReviews;
