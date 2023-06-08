import "./spotDetails.css";

export default function SpotDetailsHeader({ spot }) {
  return (
    <>
      <h1>{spot.name}</h1>
      <div className="details-sub-header">
        <i className="fa-solid fa-star star"></i>{" "}
        <div className="details-sub-header-info">
          <p>
            {spot.avgRating ? `${Number(spot.avgRating).toFixed(2)}` : "new"} ·{" "}
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
            <i className="fa-regular fa-heart"></i>
            <p>Save</p>
          </button>
        </div>
      </div>
    </>
  );
}
