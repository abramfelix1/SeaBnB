export default function SpotInfo({ spot }) {
  return (
    <div className="spot-card-info-container">
      <div>
        {`${spot.city},${spot.state}`}
        <span className="spot-card-rating">
          {" "}
          ★{spot.avgRating ? `${spot.avgRating}` : "new"}
        </span>
      </div>
      <div className="spot-price">
        ${spot.price} <span>night</span>
      </div>
    </div>
  );
}
