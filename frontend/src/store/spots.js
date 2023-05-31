import { csrfFetch } from "./csrf";

// Action Type
const LOAD = 'spots/LOAD';

// Action Creators
const load = spots => ({
  type: LOAD,
  spots
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

// Inital state
const initialState = {
  spots: null
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  let newState;
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
    default:
      return state;
  }
};

export default spotsReducer;