import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "spots/POPULATE";

const populateSpots = (spots) => {
  return {
    type: POPULATE,
    spots,
  };
};

export const getSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(populateSpots(spots));
  }
};

export default function spotsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case POPULATE:
      return action.spots.Spots.reduce((spots, spot) => {
        spots[spot.id] = spot;
        return spots;
      }, {});
    default:
      return state;
  }
}
