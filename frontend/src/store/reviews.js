import { csrfFetch } from "./csrf";

// Action Types
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEWS";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Action Creators
const load = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const updateReview = (review) => ({
  type: EDIT_REVIEW,
  review,
});

const delReview = (id) => ({
  type: DELETE_REVIEW,
  id,
});

// Thunk Action Creators
export const getSpotReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(load(reviews));
  }
};

export const createReview = (id, formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(addReview(review));
  }
};

export const editReview = (id, formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(updateReview(review));
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(delReview(reviewId));
  }
};

// Initial state
const initialState = {};

// Reducer
const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewsMap = {};
      action.reviews.Reviews.forEach((review) => {
        reviewsMap[review.id] = review;
      });
      return reviewsMap;
    case ADD_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case EDIT_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
