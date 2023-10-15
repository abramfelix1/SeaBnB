import { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import { createBooking, getCurrentBookings } from "../../store/booking";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function SpotBookingCard({ spot }) {
  const dispatch = useDispatch();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async () => {
    const payload = { startDate: checkIn, endDate: checkOut };

    let hasErrors = false;
    try {
      await dispatch(createBooking(id, payload));
    } catch (err) {
      setSuccessMessage(false);
      hasErrors = true;
      const data = await err.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
    if (!hasErrors) {
      setErrors({});
      setSuccessMessage(true);
    }
  };

  return (
    <>
      {showBookingModal && (
        <Modal closeModal={setShowBookingModal} type={"booking"} />
      )}
      <div className="spot-booking-container">
        <div className="spot-booking-header">
          <div className="spot-booking-header-left">
            <h2 className="spot-booking-header-left-price">
              ${Number(spot.price).toFixed(2)} <span>night</span>
            </h2>
          </div>
          <div className="spot-booking-header-right">
            {" "}
            <i className="fa-solid fa-star"></i>{" "}
            {spot.avgRating !== null
              ? `${Number(spot.avgRating).toFixed(2)}`
              : "new"}{" "}
            {spot.numReviews > 1 && "· " + spot.numReviews + " reviews"}
            {spot.numReviews === 1 && "· " + spot.numReviews + " review"}
            {spot.numReviews === 0 && ""}
          </div>
        </div>
        <div className="booking-errors">
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
        <div className="spot-booking-calendar-container">
          <div className="spot-booking-calendar-form">
            <div className="check-in-container">
              <p>CHECK-IN</p>
              <input
                type="date"
                className="check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              ></input>
            </div>
            <div className="check-in-container">
              <div className="calendar-cover"></div>
              <p>CHECK-OUT</p>
              <input
                type="date"
                className="check-in"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="spot-booking-button-container">
          <button
            onClick={() => {
              // setShowBookingModal(!showBookingModal);
              handleSubmit();
            }}
          >
            RESERVE
          </button>
        </div>
      </div>
    </>
  );
}
