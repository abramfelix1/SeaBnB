import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentReviews, getSpotReviews } from "../../store/reviews";
import { getSpotDetails } from "../../store/spots";
import Modal from "../Modals/Modal";
import ReviewsInfo from "./ReviewsInfo";
import "./reviews.css";
import "../Spots/spots.css";

export default function ReviewsList({
  reviews,
  manage,
  spot,
  spotId,
  isChanged,
  setIsChanged,
}) {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const user = useSelector((state) => state.session.user);
  reviews = useSelector((state) => Object.values(state.reviews));
  reviews.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  useEffect(() => {
    if (manage) {
      dispatch(getCurrentReviews());
    } else {
      dispatch(getSpotReviews(spotId));
    }
    if (isChanged === true || isChanged === false) {
      setIsChanged(!isChanged);
    }
  }, [dispatch, spotId, manage, showDeleteModal, showReviewModal]);

  return (
    <>
      {reviews.length > 0 ? (
        <>
          {showDeleteModal && (
            <Modal
              closeModal={setShowDeleteModal}
              type={"delete"}
              action={"review"}
              id={reviewId}
              spotId={spotId}
            />
          )}
          {showReviewModal && (
            <Modal
              closeModal={setShowReviewModal}
              type={"review"}
              action={"edit"}
              id={reviewId}
            />
          )}
          {reviews.map((review) => {
            return (
              <div key={review.id}>
                <ReviewsInfo review={review} spot={spot} />
                <div
                  className={`current-buttons-container review ${
                    manage ? "manage" : "review"
                  }`}
                >
                  {user?.id && user.id === review.userId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowReviewModal(!showReviewModal);
                        setReviewId(review.id);
                      }}
                    >
                      Update
                    </button>
                  )}
                  {user?.id && user.id === review.userId && (
                    <button
                      className="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteModal(!showDeleteModal);
                        setReviewId(review.id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {!manage && (
            <p style={{ marginTop: "30px", fontSize: "18px" }}>
              Be the first to post a review!
            </p>
          )}
        </>
      )}
    </>
  );
}
