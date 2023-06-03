import { useState } from "react";

import ReviewsList from "../Reviews/ReviewsList";
import Modal from "../Modals/Modal";
import "../Reviews/reviews.css";

export default function SpotReviews({ spot, reviews }) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <>
      {showReviewModal && (
        <Modal closeModal={setShowReviewModal} type={"review"} />
      )}
      <div className="reviews-content-container">
        <div className="reviews-header-container">
          <div className="reviews-header">
            <h1>
              {" "}
              <i className="fa-solid fa-star"></i>{" "}
              {spot.avgRating?.toFixed(2) || "new"}{" "}
              {spot.numReviews > 1 && "· " + spot.numReviews + " reviews"}
              {spot.numReviews === 1 && "· " + spot.numReviews + " review"}
              {spot.numReviews === 0 && ""}
            </h1>
          </div>
          <button
            className="reviews-button"
            onClick={() => {
              setShowReviewModal(!showReviewModal);
            }}
          >
            Post your Review
          </button>
        </div>
        <ReviewsList reviews={reviews} spotId={spot.id} />
      </div>
    </>
  );
}
