import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "spots/POPULATE";
const READ = "spots/READ";
const ADD = "spots/ADD";
const DELETE = "spots/DELETE";
const ADD_IMG = "spots/ADD_IMG";
const UPDATE = "spots/UPDATE";

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
    type: ADD_IMG,
    id,
    img,
  };
};

const removeSpot = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const updateSpot = (spot) => {
  return {
    type: UPDATE,
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

export const deleteSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeSpot(id));
  }
};

export const getCurrentSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const spots = await response.json();
    dispatch(populateSpots(spots));
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
  }
};

export const editSpot = (id, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(updateSpot(spot));
    return spot.id;
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
    case DELETE:
      delete newState[action.id];
      return newState;
    case UPDATE:
      newState[action.spot.id] = action.spot;
      return newState;
    case ADD_IMG:
      newState[action.id].SpotImages = [action.img];
      return newState;
    default:
      return state;
  }
}
