import { useState } from "react";
import { useDispatch } from "react-redux";
import "./form.css";

export default function ReviewForm({ closeModal }) {
  const dispatch = useDispatch;
  const [review, setReview] = useState(null);
  const [filled, setFilled] = useState(false);
  const [errors, setErrors] = useState({});

  const inputHandler = (e) => {
    if (e.target.name === "review") setReview(e.target.value);
  };

  const handleMouseEnter = (index) => {
    setFilled(index);
  };

  const handleMouseLeave = () => {
    setFilled(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <div className="form-review-container">
      <div className="form-header">
        <i
          className="fa-solid fa-x"
          onClick={() => {
            closeModal();
          }}
        ></i>
        <h1>How was your stay?</h1>
        {errors.credential && (
          <div className="form-errors">
            <p>{errors.credential}</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="review"
          placeholder="Leave a review"
          onChange={inputHandler}
        />
        <div className="review-rating-container">
          {new Array(5).fill(null).map((el, i) => (
            <i
              key={"rating" + i}
              name={`star${i}`}
              className={`fa-solid fa-star ${i <= filled ? "fill" : ""}`}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
          <p>Stars</p>
        </div>
      </form>
    </div>
  );
}
