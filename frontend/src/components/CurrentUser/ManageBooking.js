import { useEffect, useState } from "react";
import ReviewsList from "../Reviews/ReviewsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBookings } from "../../store/booking";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "../Modals/Modal";

export default function ManageBooking() {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [startRender, setStartRender] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const bookings = useSelector((state) => Object.values(state.bookings));

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
              <p className="booking-dates">
                {booking?.startDate && booking.startDate.split("T")[0]} -{" "}
                {booking?.endDate && booking.endDate.split("T")[0]}
              </p>
              <div className="current-buttons-container">
                <button
                  className="edit-button"
                  // onClick={() => handleEdit(booking)}
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
