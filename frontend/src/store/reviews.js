import { csrfFetch } from "./csrf";

// Action Types
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

// Action Creators
const delReview = (id) => ({
  type: DELETE_REVIEW,
  id,
});

// Thunk Action Creators
export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(delReview(reviewId));
  }
};