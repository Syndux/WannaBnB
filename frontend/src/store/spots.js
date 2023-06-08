import { csrfFetch } from "./csrf";

// Action Types
const LOAD = "spots/LOAD";
const ADD_SPOT = "spots/ADD_SPOT";
const ADD_IMAGE = "spots/ADD_IMAGE";

// Action Creators
const load = (spots) => ({
  type: LOAD,
  spots,
});

const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

const addImage = (spotId, image) => ({
  type: ADD_IMAGE,
  payload: { spotId, image }
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
    return spot;
  }
};

// Initial state
const initialState = {
  spots: null,
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const spotsMap = {};
      action.spots.Spots.forEach((spot) => {
        spotsMap[spot.id] = spot;
      });
      return {
        ...state,
        spots: spotsMap,
      };
    case ADD_SPOT:
      const newSpot = action.spot;
      return {
        ...state,
        spots: {
          ...state.spots,
          [newSpot.id]: newSpot,
        },
      };
      case ADD_IMAGE:
        const { spotId, image } = action.payload;
        const spot = state.spots[spotId];
        const images = spot.images || [];
      
        return {
          ...state,
          spots: {
            ...state.spots,
            [spotId]: {
              ...spot,
              images: [...images, image], 
            },
          },
        };
      
    default:
      return state;
  }
};

export default spotsReducer;
