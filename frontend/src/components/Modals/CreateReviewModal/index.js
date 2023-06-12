import React from "react";
import { useDispatch } from "react-redux";

import { createReview } from "../../../store/reviews";

import "./CreateReviewModal.css";

const CreateReviewModal = ({ spotId }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      await dispatch(createReview(spotId));
    })();
  };

  return (
    <div>
      
    </div>
  )
};

export default CreateReviewModal;
