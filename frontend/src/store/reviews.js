import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "reviews/POPULATE";

const populateReviews = (reviews) => {
  return {
    type: POPULATE,
    reviews,
  };
};

export const getSpotReviews = (id) => async (dispatch) => {
  console.log("A");
  const response = await csrfFetch(`/api/spots/${id}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(populateReviews(reviews));
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
    default:
      return state;
  }
}
