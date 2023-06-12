import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "../../context/Modal";
import DeleteModal from "../Modals/DeleteModal";

const SingleReview = ({ review }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user)


  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const createdDate = new Date(review.createdAt);
  const reviewMonth = monthNames[createdDate.getMonth()];
  const reviewYear = createdDate.getFullYear();

  return (
    <div className="single-review-container">
      <div className="single-review-user">{`${review.User.firstName}`}</div>
      <div className="single-review-posted-date">
        {`${reviewMonth} ${reviewYear}`}
      </div>
      <div className="single-review-content">{`${review.review}`}</div>
      {user?.id && user.id === review.userId && (
        <div>
          <button
            className="single-review-delete"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            Delete
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeleteModal onClose={() => setShowModal(false)} reviewId={`${review.id}`} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleReview;
