import "./spotDetails.css";

export default function SpotDetailsHeader({ spot }) {
  return (
    <>
      <h1>{spot.name}</h1>
      <div className="details-sub-header">
        <div className="details-sub-header-info">
          <p>
            <i className="fa-solid fa-star"></i> {spot.avgRating} ·{" "}
            <span>{spot.numReviews} reviews</span>
            {""}
            <span className="period"> . </span>
            {""}
            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </p>
        </div>
        <div className="details-sub-header-buttons">
          <button>
            <i className="fa-solid fa-arrow-up-from-bracket"></i> <p>Share</p>
          </button>
          <button>
            <i class="fa-regular fa-heart"></i>
            <p>Save</p>
          </button>
        </div>
      </div>
    </>
  );
}
