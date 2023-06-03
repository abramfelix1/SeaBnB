import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentReviews } from "../../store/reviews";
import Modal from "../Modals/Modal";
import ReviewsInfo from "./ReviewsInfo";
import "./reviews.css";
import "../Spots/spots.css";

export default function ReviewsList({ reviews, manage }) {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    if (manage) dispatch(getCurrentReviews());
    console.log(reviewId);
  }, [dispatch, manage, reviewId]);

  return (
    <>
      {reviews.length > 0 ? (
        <>
          {showDeleteModal && (
            <Modal
              closeModal={setShowDeleteModal}
              type={"delete"}
              id={reviewId}
            />
          )}
          {showReviewModal && (
            <Modal
              closeModal={setShowReviewModal}
              type={"review"}
              id={reviewId}
            />
          )}
          {reviews.map((review) => (
            <>
              <ReviewsInfo key={review.id} review={review} />
              <div
                className={`current-buttons-container review ${
                  manage ? "manage" : "review"
                }`}
              >
                {manage && (
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
                <button
                  className={`${manage ? "manage" : "delete"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(!showDeleteModal);
                    setReviewId(review.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          ))}
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
