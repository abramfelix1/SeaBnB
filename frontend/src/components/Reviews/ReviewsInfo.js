import { useEffect } from "react";
import "./reviews.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ReviewsInfo({ review, manage }) {
  let isUpdated = review.createdAt === review.updatedAt;
  const date = new Date(isUpdated ? review.createdAt : review.updatedAt);
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];

  useEffect(() => {
    console.log(review);
  }, [review]);

  return (
    <div className="reviews-list-container">
      <div className="reviews-item-header-container">
        <div className="reviews-item-header-left">
          {!manage && (
            <>
              review.User.User?.profileImg !== null ? (
              <img src={review.User.User?.profileImg} alt="profile-pic"></img>)
              : (<i className="fa-solid fa-circle-user"></i>)
            </>
          )}
        </div>
        <div className="reviews-item-header-right">
          <p>{!manage && review.User?.firstName}</p>
          {manage && (
            <NavLink
              className="review-spot-link"
              to={`/spots/${review.Spot?.id}`}
            >
              {review.Spot?.name}
            </NavLink>
          )}
          <p>
            {month} {year} {isUpdated ? "" : "(edited)"}
          </p>
        </div>
      </div>
      <div className="reviews-review">
        <p>{review.review}</p>
      </div>
    </div>
  );
}
