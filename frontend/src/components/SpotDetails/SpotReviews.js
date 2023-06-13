import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "../../context/Modal";
import { getSpotDetails } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import CreateReviewModal from "../Modals/CreateReviewModal";
import ReviewsList from "./ReviewsList";

const SpotReviews = ({ spot }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const oldReview = reviews.find(({ userId }) => user?.id === userId);
  const isOwner = spot.ownerId === user?.id;

  useEffect(() => {
    (async () => {
      await dispatch(getSpotReviews(spot.id));
    })();
  }, [dispatch, update, spot]);

  return (
    <div className="spot-reviews-content-container">
      <div className="spot-reviews-avg-rating-container">
        <i className="fa-sharp fa-solid fa-star" />{" "}
        <span className="spot-reviews-avg-rating">
          {spot.avgStarRating
            ? spot.avgStarRating.toFixed(
                Number.isInteger(spot.avgStarRating) ? 1 : 2
              )
            : "New"}
          {spot.numReviews ? " · " + `${spot.numReviews}` : ""}
          {spot.numReviews ? (spot.numReviews > 1 ? " reviews" : " review") : ""}
        </span>
      </div>
      {user?.id && !oldReview && !isOwner && (
        <>
          <button
            className="spot-reviews-post-button"
            onClick={() => {
              setShowModal(true);
              setUpdate(!update);
            }}
          >
            Post Your Review
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <CreateReviewModal
                onClose={() => setShowModal(false)}
                spotId={`${spot.id}`}
              />
            </Modal>
          )}
        </>
      )}

      {reviews.length ? (
        <ReviewsList reviews={reviews} spot={spot} />
      ) : (
        <>{!isOwner && <p>Be the first to post a review!</p>}</>
      )}
    </div>
  );
};

export default SpotReviews;
