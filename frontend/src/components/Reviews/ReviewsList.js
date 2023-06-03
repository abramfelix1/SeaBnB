import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentReviews, getSpotReviews } from "../../store/reviews";
import Modal from "../Modals/Modal";
import ReviewsInfo from "./ReviewsInfo";
import "./reviews.css";
import "../Spots/spots.css";
import { useParams } from "react-router-dom/";

export default function ReviewsList({ reviews, manage }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    if (manage) {
      dispatch(getCurrentReviews());
    }
  }, [dispatch, manage]);

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
          {reviews.map((review) => (
            <div key={review.id}>
              <ReviewsInfo review={review} />
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
            </div>
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
