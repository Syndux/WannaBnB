import React from "react";
import SingleReview from "./SingleReview";

const ReviewsList = ({ reviews, spot }) => {
  const sortedReviews = reviews.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateB - dateA;
  });

  return (
    <div className="reviews-container">
      {sortedReviews.map((review) => (
        <SingleReview review={review} key={review.id} spot={spot} />
      ))}
    </div>
  );
};

export default ReviewsList;
