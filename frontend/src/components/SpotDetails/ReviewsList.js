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

export default function ReviewsList({ review }) {
  const date = new Date(review.createdAt);
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth() + 1];

  return (
    <div className="reviews-list-container">
      <div className="reviews-item-header-container">
        <div className="reviews-item-header-left">
          <i className="fa-solid fa-circle-user"></i>
        </div>
        <div className="reviews-item-header-right">
          <p>
            {review.User.firstName} {review.User.lastName}
          </p>
          <p>
            {month} {year}
          </p>
        </div>
      </div>
      <div className="reviews-review">
        <p>{review.review}</p>
      </div>
    </div>
  );
}
