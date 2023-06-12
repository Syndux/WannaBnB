import React from "react";
import { useDispatch } from "react-redux";

import { deleteSpot } from "../../../store/spots";
import { deleteReview } from "../../../store/reviews";

import "./DeleteModal.css";

const DeleteModal = ({ onClose, spotId, reviewId }) => {
  const dispatch = useDispatch();

  const handleYes = (e) => {
    e.preventDefault();

    (async () => {
      if (spotId) {
        await dispatch(deleteSpot(spotId));
      } else {
        await dispatch(deleteReview(reviewId));
      }
    })();

    onClose();
  };

  return (
    <div className="confirm-delete-container">
      <div className="confirm-delete-header">Confirm Delete</div>
      <div className="confirm-delete-description">
        {spotId ? (
          <p>Are you sure you want to remove this spot from the listings?</p>
        ) : (
          <p>Are you sure you want to delete this review?</p>
        )}
      </div>
      <div className="confirm-delete">
        <button onClick={handleYes}>Yes (Delete {spotId ? "Spot" : "Review"})</button>
        <button onClick={onClose}>No (Keep {spotId ? "Spot" : "Review"})</button>
      </div>
    </div>
  );
};

export default DeleteModal;
