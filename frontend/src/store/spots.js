import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "spots/POPULATE";
const DETAILS = "spots/DETAILS";

const populateSpots = (spots) => {
  return {
    type: POPULATE,
    spots,
  };
};

const spotDetails = (spot) => {
  return {
    type: DETAILS,
    spot,
  };
};

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(populateSpots(spots));
  }
};

export const getSpotDetails = (id) => async (dispatch) => {
  console.log(`/api/spots/${id}`);
  const response = await csrfFetch(`/api/spots/${id}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(spotDetails(spot));
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
    case DETAILS:
      return action.spot;
    default:
      return state;
  }
}
