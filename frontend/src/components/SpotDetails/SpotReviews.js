import "./reviews.css";

export default function SpotReviews({ spot }) {
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
      <div className="reviews-list-container">
        <div className="reviews-item-header-container">
          <div className="reviews-item-header-left">
            <i className="fa-solid fa-circle-user"></i>
          </div>
          <div className="reviews-item-header-right">
            <p>NAME </p>
            <p>Date</p>
          </div>
        </div>
        <div className="reviews-review">
          <p>REVIEW HERE</p>
        </div>
      </div>
    </div>
  );
}
