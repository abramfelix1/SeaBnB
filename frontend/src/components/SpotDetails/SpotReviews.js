import { useState } from "react";

import ReviewsList from "./ReviewsList";
import ReviewFormModal from "../Modals/ReviewFormModal";
import "./reviews.css";

export default function SpotReviews({ spot, reviews }) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <>
      {showReviewModal && <ReviewFormModal closeModal={setShowReviewModal} />}
      <div className="reviews-content-container">
        <div className="reviews-header-container">
          <div className="reviews-header">
            <h1>
              {" "}
              <i className="fa-solid fa-star"></i> {spot.avgRating || "new"}{" "}
              {spot.numReviews > 0 ? "· " + spot.numReviews + " reviews" : ""}
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
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewsList key={review.id} review={review} />
          ))
        ) : (
          <p style={{ marginTop: "30px", fontSize: "18px" }}>
            Be the first to post a review!
          </p>
        )}
      </div>
    </>
  );
}
