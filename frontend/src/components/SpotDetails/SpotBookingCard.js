import { useState } from "react";
import Modal from "../Modals/Modal";

export default function SpotBookingCard({ spot }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

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
        <div className="spot-booking-button-container">
          <button
            onClick={() => {
              setShowBookingModal(!showBookingModal);
            }}
          >
            RESERVE
          </button>
        </div>
      </div>
    </>
  );
}
