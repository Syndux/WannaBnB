import { csrfFetch } from "./csrf";

// Action Types
const LOAD = 'spots/LOAD';
const ADD_SPOT = 'spots/ADD_SPOT';

// Action Creators
const load = spots => ({
  type: LOAD,
  spots
});

const addSpot = spot => ({
  type: ADD_SPOT,
  spot
});

// Thunk Action Creators
export const loadSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const createSpot = (formData) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data));
    return data;
  }
};

// Initial state
const initialState = {
  spots: null
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
    default:
      return state;
  }
};

export default spotsReducer;
