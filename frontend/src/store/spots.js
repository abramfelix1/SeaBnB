import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "spots/POPULATE";
const READ = "spots/READ";
const ADD = "spots/ADD";
const ADDIMG = "spots/ADDIMG";

const populateSpots = (spots) => {
  return {
    type: POPULATE,
    spots,
  };
};

const spotDetails = (spot) => {
  return {
    type: READ,
    spot,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD,
    spot,
  };
};

const addImage = (id, img) => {
  return {
    type: ADDIMG,
    id,
    img,
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
  const response = await csrfFetch(`/api/spots/${id}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(spotDetails(spot));
  }
};

export const createSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(addSpot(spot));
    return spot.id;
  }
};

export const createImage = (id, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(addImage(id, image));
  } else {
    return true;
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
    case READ:
      return action.spot;
    case ADD:
      newState[action.spot.id] = action.spot;
      return newState;
    case ADDIMG:
      console.log(newState.spots);
      // if (!newState[action.id].SpotImages) {
      //   newState[action.id].SpotImages = [action.img];
      // }
      // if (newState[action.id].SpotImages.length > 0) {
      //   newState[action.id].SpotImages = [
      //     ...newState[action.id].SpotImages,
      //     action.img,
      //   ];
      // }
      return newState;
    default:
      return state;
  }
}
