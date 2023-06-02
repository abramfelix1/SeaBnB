import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "reviews/POPULATE";
const ADD = "reviews/ADD";

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
    default:
      return state;
  }
}
