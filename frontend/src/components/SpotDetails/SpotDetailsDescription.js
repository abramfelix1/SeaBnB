import "./spotDetails.css";

export default function SpotDetailsDescription({ spot }) {
  console.log(spot.Owner?.profileImg);
  return (
    <div className="details-description-content-container">
      <div className="details-description-header-container">
        <div className="details-description-header-left">
          <h2>
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p>∞ guests · ∞ bedrooms · ∞ beds · ∞ baths</p>
        </div>
        <div className="details-description-header-right">
          {spot.Owner?.profileImg ? (
            <img src={spot.Owner.profileImg} alt="profile-pic"></img>
          ) : (
            <i className="fa-solid fa-circle-user profile"></i>
          )}
        </div>
      </div>
      <div className="details-description-extras-container">
        <div className="details-description-extras">
          <i className="fa-solid fa-door-open"></i>
          <div>
            <p>Self check-in</p>
            <p className="details-description-extras-light">
              Check yourself in with the lockbox.
            </p>
          </div>
        </div>
        <div className="details-description-extras">
          <i className="fa-solid fa-calendar-days"></i>
          <div>
            <p>Free cancellation anytime.</p>
          </div>
        </div>
      </div>
      <div className="details-description-description-container">
        <div className="description">{spot.description} </div>
      </div>
    </div>
  );
}
