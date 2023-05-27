export default function SpotInfo({ spot }) {
  return (
    <div className="spot-card-info-container">
      <div>
        {`${spot.city},${spot.state}`}
        <span> ★{spot.avgRating ? `${spot.avgRating}` : "new"}</span>
      </div>
      <div>{spot.address}</div>
      <div>${spot.price} night</div>
    </div>
  );
}
