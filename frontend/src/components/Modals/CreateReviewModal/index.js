import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createReview } from "../../../store/reviews";

import "./CreateReviewModal.css";

const CreateReviewModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [fill, setFill] = useState(0);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleStarHover = (rating) => {
    setFill(rating);
  };

  const handleStarHoverLeave = () => {
    setFill(stars);
  };

  const handleStarClick = (rating) => {
    setStars(rating);
  };

  useEffect(() => {
    setFill(stars);
  }, [stars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (Object.keys(errors).length === 0) {
      const formData = {
        review,
        stars,
      };

      return dispatch(createReview(spotId, formData)).catch(async (res) => {
        const data = await res.json();
        if (data.message) data.errors = { createReview: data.message };
        if (data && data.errors) setErrors(data.errors);
      });
    }
  };

  const handleInput = (e) => {
    setReview(e.target.value);
    setIsButtonDisabled(e.target.value.length < 10 || stars === 0);
  };

  return (
    <div className="create-review-container">
      <div className="create-review-header">How was your stay?</div>
      <form onSubmit={handleSubmit} className="create-review-form-container">
        {errors.createReview && (
          <p className="create-review-error-message">{errors.createReview}</p>
        )}
        <textarea
          className="create-review-content"
          placeholder="Leave your review here..."
          onChange={handleInput}
          rows="6"
        />
        <div className="create-review-ratings">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span
              key={rating}
              className={`star ${rating <= fill ? "filled" : ""}`}
              onMouseEnter={() => handleStarHover(rating)}
              onMouseLeave={() => handleStarHoverLeave()}
              onClick={() => handleStarClick(rating)}
            >
              {rating <= fill ? (
                <i className="fa-solid fa-star" style={{ color: "#000000" }} />
              ) : (
                <i className="fa-regular fa-star" style={{ color: "#000000" }} />
              )}
            </span>
          ))}
          <span className="stars-text">Stars</span>
        </div>
        <button className={`create-review-submit ${isButtonDisabled ? "disabled": ""}`}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default CreateReviewModal;
