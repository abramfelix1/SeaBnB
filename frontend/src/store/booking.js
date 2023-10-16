import { csrfFetch } from "./csrf";

const initialState = {};

const POPULATE = "bookings/POPULATE";
const ADD = "bookings/ADD";
const UPDATE = "bookings/UPDATE";
const DELETE = "bookings/DELETE";

const populateBookings = (bookings) => {
  return {
    type: POPULATE,
    bookings,
  };
};

const addBooking = (booking) => {
  return {
    type: ADD,
    booking,
  };
};

const updateBooking = (booking) => {
  return {
    type: UPDATE,
    booking,
  };
};

const removeBooking = (id) => {
  return {
    type: DELETE,
    id,
  };
};

export const getSpotbookings = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/bookings`);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(populateBookings(bookings));
  }
};

export const createBooking = (id, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(addBooking(id));
  }
};

export const getCurrentBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  if (response.ok) {
    const bookings = await response.json();
    await dispatch(populateBookings(bookings));
  }
};

export const editBooking = (id, payload) => async (dispatch) => {
  console.log(payload);
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const booking = await response.json();
    await dispatch(updateBooking(booking));
  }
};

export const deleteBooking = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeBooking(id));
  }
};

export default function bookingsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case POPULATE:
      return action.bookings.Bookings.reduce((bookings, booking) => {
        bookings[booking.id] = booking;
        return bookings;
      }, {});
    case ADD:
      newState[action.booking.id] = action.booking;
      return newState;
    case UPDATE: {
      newState[action.booking.id] = {
        ...newState[action.booking.id],
        ...action.booking,
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
