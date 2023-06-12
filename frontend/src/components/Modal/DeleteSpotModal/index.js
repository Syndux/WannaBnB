import React from "react";
import { useDispatch } from "react-redux";

import { deleteSpot } from "../../../store/spots";

const DeleteSpotModal = ({ onClose, spotId }) => {
  const dispatch = useDispatch();

  const handleYes = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId))
    onClose();
  };

  return (
    <div className="confirm-delete-container">
      <div className="confirm-delete-header">
        <h1>Confirm Delete</h1>
      </div>
      <div className="confirm-delete-description">
        <p>Are you sure you want to remove this spot from the listings?</p>
      </div>
      <div className="confirm-delete">
        <button onClick={handleYes}>Yes (Delete Spot)</button>
        <button onClick={onClose}>No (Keep Spot)</button>
      </div>
    </div>
  );
};

export default DeleteSpotModal;
