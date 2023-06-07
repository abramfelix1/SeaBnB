import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails } from "../../store/spots";

import ReviewsList from "../Reviews/ReviewsList";
import Modal from "../Modals/Modal";
import "../Reviews/reviews.css";

export default function SpotReviews({ spot }) {
  const dispatch = useDispatch();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const reviews = useSelector((state) => Object.values(state.reviews));
  reviews.sort((a, b) => b.id - a.id);

  useEffect(() => {
    dispatch(getSpotDetails(spot.id));
  }, [isChanged, dispatch, spot.id, showReviewModal]);

  return (
    <>
      {showReviewModal && (
        <Modal closeModal={setShowReviewModal} type={"review"} />
      )}
      <div className="reviews-content-container">
        <div className="reviews-header-container">
          <div className="reviews-header">
            <h2>
              {" "}
              <i className="fa-solid fa-star"></i>{" "}
              {spot.avgRating?.toFixed(2) || "new"}{" "}
              {spot.numReviews > 1 && "· " + spot.numReviews + " reviews"}
              {spot.numReviews === 1 && "· " + spot.numReviews + " review"}
              {spot.numReviews === 0 && ""}
            </h2>
          </div>
          <button
            className="reviews-button"
            onClick={() => {
              setShowReviewModal(!showReviewModal);
              setIsChanged(!isChanged);
            }}
          >
            Post your Review
          </button>
        </div>
        <ReviewsList
          reviews={reviews}
          spotId={spot.id}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
      </div>
    </>
  );
}
