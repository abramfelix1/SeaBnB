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
  const [hasPosted, setHasPosted] = useState(null);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const postedReview = reviews.find(({ userId }) => user?.id === userId);
  const isOwner = spot.ownerId === user?.id;

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
          <i className="fa-solid fa-star star"></i>{" "}
          <div className="reviews-header">
            <h2>
              {" "}
              {spot.avgRating !== null
                ? `${Number(spot.avgRating).toFixed(2)}`
                : "new"}{" "}
              {spot.numReviews > 1 && "· " + spot.numReviews + " reviews"}
              {spot.numReviews === 1 && "· " + spot.numReviews + " review"}
              {spot.numReviews === 0 && ""}
            </h2>
          </div>
          {!postedReview && !isOwner && user?.id && (
            <button
              className="reviews-button"
              onClick={() => {
                setShowReviewModal(!showReviewModal);
                setIsChanged(!isChanged);
              }}
            >
              Post your Review
            </button>
          )}
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
