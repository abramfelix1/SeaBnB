export default function SpotInfo({ spot }) {
  return (
    <div className="spot-card-info-container">
      <div>
        {`${spot.city}, ${spot.state}`}
        <span className="spot-card-rating">
          {" "}
          <i className="fa-solid fa-star"></i>{" "}
          <p>
            {spot.avgRating !== null
              ? `${Number(spot.avgRating).toFixed(2)}`
              : "new"}
          </p>
        </span>
      </div>
      <div className="spot-distance">
        <p>Somewhere +/- ~24,902 mi away</p>
        <p>Any Day</p>
      </div>
      <div className="spot-price">
        ${Number(spot.price).toFixed(2)} <span>night</span>
      </div>
    </div>
  );
}
