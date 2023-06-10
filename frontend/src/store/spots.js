import { csrfFetch } from "./csrf";

// Action Types
const LOAD = "spots/LOAD";
const LOAD_SINGLE = "spots/LOAD_SINGLE";
const ADD_SPOT = "spots/ADD_SPOT";
const ADD_IMAGE = "spots/ADD_IMAGE";

// Action Creators
const load = (spots) => ({
  type: LOAD,
  spots,
});

const loadSingle = (spot) => ({
  type: LOAD_SINGLE,
  spot,
});

const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

const addImage = (spotId, image) => ({
  type: ADD_IMAGE,
  payload: { spotId, image },
});

// Thunk Action Creators
export const loadSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const getSpotDetails = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSingle(data));
  }
};

export const createSpot = (formData) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(addSpot(spot));

    const spotId = spot.id;
    const images = formData.images;

    for (const image of images) {
      const imageResponse = await csrfFetch(`/api/spots/${spotId}/images/`, {
        method: "POST",
        body: JSON.stringify({
          url: image.url,
          preview: image.preview,
        }),
      });

      if (imageResponse.ok) {
        const addedImage = await imageResponse.json();
        dispatch(addImage(spotId, addedImage));
      }
    }
    return spotId;
  }
};

// Initial state
const initialState = {};

// Reducer
const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      const spotsMap = {};
      action.spots.Spots.forEach((spot) => {
        spotsMap[spot.id] = spot;
      });
      return {
        ...state,
        ...spotsMap,
      };
    case LOAD_SINGLE:
      newState[action.spot.id] = action.spot;
      return newState;
    case ADD_SPOT:
      const newSpot = action.spot;
      return {
        ...state,
        [newSpot.id]: newSpot,
      };
    case ADD_IMAGE:
      const { spotId, image } = action.payload;
      const spot = state[spotId];
      const images = spot.images || [];

      return {
        ...state,
        [spotId]: {
          ...spot,
          images: [...images, image],
        },
      };

    default:
      return state;
  }
};

export default spotsReducer;
