import "./spotDetails.css";

export default function SpotDetailsDescription({ spot }) {
  return (
    <div className="details-description-content-container">
      <div className="details-description-header-container">
        <div className="details-description-header-left">
          <h1>
            Entire home hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h1>
          <p>∞ guests · ∞ bedrooms · ∞ beds · ∞ baths</p>
        </div>
        <div className="details-description-header-right">
          <i className="fa-solid fa-circle-user profile"></i>
        </div>
      </div>
      <div className="details-description-extras-container">
        <div className="details-description-extras">
          <i class="fa-solid fa-door-open"></i>
          <div>
            <p>Self check-in</p>
            <p className="details-description-extras-light">
              Check yourself in with the lockbox.
            </p>
          </div>
        </div>
        <div className="details-description-extras">
          <i class="fa-solid fa-calendar-days"></i>
          <div>
            <p>Free cancellation anytime.</p>
          </div>
        </div>
      </div>
      <div className="details-description-description-container">
        <div>{spot.description} </div>
      </div>
    </div>
  );
}
