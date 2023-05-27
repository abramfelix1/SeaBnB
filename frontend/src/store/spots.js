import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "spots/POPULATE";

export const populateSpots = (spots) => {
  return {
    type: POPULATE,
    spots,
  };
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
