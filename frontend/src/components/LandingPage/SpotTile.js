import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "../../context/Modal";
import DeleteModal from "../Modal/DeleteModal";

const SpotTile = ({ spot, manage }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="spot-tile">
      <Link to={`/spots/${spot.id}`}>
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
      {manage && (
        <div className="spot-tile-manage-container">
          <Link to={`/spots/${spot.id}/edit`}>
            <button>Update</button>
          </Link>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Delete
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeleteModal onClose={() => setShowModal(false)} spotId={`${spot.id}`}/>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default SpotTile;
