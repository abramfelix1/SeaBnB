import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "reviews/POPULATE";
const ADD = "reviews/ADD";
const UPDATE = "reviews/UPDATE";
const DELETE = "reviews/DELETE";

const populateReviews = (reviews) => {
  return {
    type: POPULATE,
    reviews,
  };
};

const addReview = (payload) => {
  return {
    type: ADD,
    payload,
  };
};

const updateReview = (review) => {
  return {
    type: UPDATE,
    review,
  };
};

const removeReview = (id) => {
  return {
    type: DELETE,
    id,
  };
};

export const getSpotReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(populateReviews(reviews));
  }
};

export const createReview = (id, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(addReview(review));
  }
};

export const getCurrentReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current");
  if (response.ok) {
    const reviews = await response.json();
    dispatch(populateReviews(reviews));
  }
};

export const editReview = (id, payload) => async (dispatch) => {
  console.log(id);
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(updateReview(review));
  }
};

export const deleteReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeReview(id));
  }
};

export default function reviewsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case POPULATE:
      return action.reviews.Reviews.reduce((reviews, review) => {
        reviews[review.id] = review;
        return reviews;
      }, {});
    case ADD:
      newState[action.review.id] = action.review;
      return newState;
    case UPDATE: {
      newState[action.review.id] = {
        ...newState[action.review.id],
        ...action.review,
      };
      return newState;
    }
    case DELETE: {
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
}
