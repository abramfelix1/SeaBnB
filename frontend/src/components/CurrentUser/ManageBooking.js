import { useEffect, useState } from "react";
import ReviewsList from "../Reviews/ReviewsList";
import { useDispatch, useSelector } from "react-redux";
import { editBooking, getCurrentBookings } from "../../store/booking";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "../Modals/Modal";

export default function ManageBooking() {
  const dispatch = useDispatch();
  const [startRender, setStartRender] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [checkIn, setCheckIn] = useState({ id: null, value: null });
  const [checkOut, setCheckOut] = useState({ id: null, value: null });
  const [bookingId, setBookingId] = useState(null);
  const bookings = useSelector((state) => Object.values(state.bookings));
  const [errors, setErrors] = useState({});
  const [errorsId, setErrorsId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [inputId, setInputId] = useState(null);

  useEffect(() => {
    dispatch(getCurrentBookings());
  }, []);

  useEffect(() => {
    console.log(bookings);
  }, [bookings]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (id, payload) => {
    // const payload = { startDate: checkIn.value, endDate: checkOut.value };

    let hasErrors = false;
    try {
      await dispatch(editBooking(id, payload));
    } catch (err) {
      setSuccessMessage(false);
      hasErrors = true;
      const data = await err.json();
      if (data && data.errors) {
        setErrors(data.errors);
        setErrorsId(id);
      }
    }
    if (!hasErrors) {
      setErrors({});
      setErrorsId(id);
      setSuccessMessage(true);
      console.log("ASDFSDFASDFSDAFSD");
    }
  };

  function isDatePast(dateString) {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    return targetDate < currentDate;
  }

  return (
    <>
      {showDeleteModal && (
        <Modal
          closeModal={setShowDeleteModal}
          type={"delete"}
          action={"booking"}
          id={bookingId}
        />
      )}
      {!startRender && (
        <div className="spot-loader">
          <div className="blinking-dots" />
        </div>
      )}
      <div className="manage-container">
        <div className="manage-header ">
          <h1>Manage Bookings</h1>
        </div>
        <div className="bookings-list-container">
          {bookings.map((booking, idx) => (
            <div key={idx} className="booking-item">
              <NavLink to={`/spots/${booking?.Spot?.id}`}>
                <img
                  src={booking.Spot?.previewImage}
                  alt={booking.Spot?.name}
                  className="booking-image"
                ></img>
              </NavLink>
              <NavLink to={`/spots/${booking?.Spot?.id}`}>
                <p className="booking-name">{booking?.Spot?.name}</p>
              </NavLink>
              <p className="booking-location">
                {booking?.Spot?.address},{booking?.Spot?.city}
              </p>
              <p className="booking-price">${booking?.Spot?.price}/night</p>
              {/* <p className="booking-dates">
                {booking?.startDate && booking.startDate.split("T")[0]} -{" "}
                {booking?.endDate && booking.endDate.split("T")[0]}
              </p> */}
              <div className="spot-booking-calendar-container">
                <div className="spot-booking-calendar-form">
                  <div
                    className={`check-in-container ${
                      isDatePast(booking.endDate) ? "strikethrough" : ""
                    }`}
                  >
                    <p>CHECK-IN</p>
                    <input
                      type="date"
                      className="check-in"
                      value={
                        checkIn.id === booking?.id
                          ? checkIn.value
                          : booking?.startDate &&
                            booking.startDate.split("T")[0]
                      }
                      onChange={(e) => {
                        setCheckIn({ id: booking.id, value: e.target.value });
                        setInputId(booking.id);
                      }}
                      disabled={isDatePast(booking.endDate)}
                    ></input>
                  </div>
                  <div
                    className={`check-in-container ${
                      isDatePast(booking.endDate) ? "strikethrough" : ""
                    }`}
                  >
                    <div className="calendar-cover"></div>
                    <p>CHECK-OUT</p>
                    <input
                      type="date"
                      className="check-in"
                      value={
                        checkOut.id === booking?.id
                          ? checkOut.value
                          : booking?.endDate && booking.endDate.split("T")[0]
                      }
                      onChange={(e) => {
                        setCheckOut({ id: booking.id, value: e.target.value });
                        setInputId(booking.id);
                      }}
                      disabled={isDatePast(booking.endDate)}
                    ></input>
                  </div>
                </div>
                {errorsId === booking.id && (
                  <div className="manage booking-errors">
                    {errors.startDate && (
                      <div className="form-errors">
                        <p>{errors.startDate}</p>
                      </div>
                    )}
                    {errors.endDate && (
                      <div className="form-errors">
                        <p>{errors.endDate}</p>
                      </div>
                    )}
                    {errors.message && (
                      <div className="form-errors">
                        <p>{errors.message}</p>
                      </div>
                    )}
                    {successMessage && (
                      <div className="booking-success form-errors">
                        <p>Booking Successfully Created!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="current-buttons-container">
                <button
                  className="edit-button"
                  onClick={() => {
                    if (inputId === booking.id)
                      handleSubmit(booking?.id, {
                        startDate: checkIn ? checkIn.value : booking.startDate,
                        endDate: checkOut
                          ? checkOut.value
                          : booking?.endDate && booking.endDate.split("T")[0],
                      });
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(!showDeleteModal);
                    setBookingId(booking.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
