import { useState } from "react";
import { useDispatch } from "react-redux";
import "./form.css";

export default function ReviewForm({ closeModal }) {
  const dispatch = useDispatch;
  const [review, setReview] = useState(null);
  const [errors, setErrors] = useState({});

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
        <form
          name="description"
          onSubmit={handleSubmit}
          onChange={inputHandler}
        >
          <textarea />
        </form>
      </div>
    </div>
  );
}
