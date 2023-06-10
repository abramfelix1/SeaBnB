import "./reviews.css";

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

export default function ReviewsInfo({ review }) {
  let isUpdated = review.createdAt === review.updatedAt;
  const date = new Date(isUpdated ? review.createdAt : review.updatedAt);
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];

  return (
    <div className="reviews-list-container">
      <div className="reviews-item-header-container">
        <div className="reviews-item-header-left">
          {review.User.User?.profileImg !== null ? (
            <img src={review.User.User?.profileImg} alt="profile-pic"></img>
          ) : (
            <i className="fa-solid fa-circle-user"></i>
          )}
        </div>
        <div className="reviews-item-header-right">
          <p>{review.User.firstName}</p>
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
