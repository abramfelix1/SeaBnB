import ReviewsList from "./ReviewsList";
import "./reviews.css";

export default function SpotReviews({ spot, reviews }) {
  return (
    <div className="reviews-content-container">
      <div className="reviews-header-container">
        <div className="reviews-header">
          <h1>
            {" "}
            <i className="fa-solid fa-star"></i> {spot.avgRating} ·{" "}
            {spot.numReviews} reviews
          </h1>
        </div>
        <button className="reviews-button">Post Your Review</button>
      </div>
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewsList key={review.id} review={review} />)
      ) : (
        <p>Be the first to post a review!</p>
      )}
    </div>
  );
}
