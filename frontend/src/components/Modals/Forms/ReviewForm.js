import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReview, editReview } from "../../../store/reviews";
import "./form.css";
import { useParams, useHistory } from "react-router-dom/";

export default function ReviewForm({ closeModal, type, currentId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [rating, setRatings] = useState("null");
  const [filled, setFilled] = useState(-1);
  const [errors, setErrors] = useState({});

  const handleMouseEnter = (index) => {
    setFilled(index);
  };

  const handleMouseLeave = (index) => {
    setFilled(rating);
  };

  useEffect(() => {
    setFilled(rating);
  }, [rating]);

  const inputHandler = (e) => {
    if (e.target.name === "review") setReview(e.target.value);
    if (e.target.name === "star0") {
      setRatings(0);
      setFilled(rating);
    }
    if (e.target.name === "star1") {
      setRatings(1);
      setFilled(rating);
    }
    if (e.target.name === "star2") {
      setRatings(2);
      setFilled(rating);
    }
    if (e.target.name === "star3") {
      setRatings(3);
      setFilled(rating);
    }
    if (e.target.name === "star4") {
      setRatings(4);
      setFilled(rating);
    }
  };

  const handleSubmit = (e) => {
    const payload = {
      review,
      stars: rating + 1,
    };

    const submit = async () => {
      e.preventDefault();
      try {
        if (type === "edit") {
          await dispatch(editReview(currentId, payload));
          closeModal(false);
        } else {
          await dispatch(createReview(id, payload));
          closeModal(false);
        }
      } catch (err) {
        const data = await err.json();
        setErrors(data.errors);
      }
    };
    submit();
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <i
          className="fa-solid fa-x"
          onClick={() => {
            closeModal();
          }}
        ></i>
        <h1>How was your stay?</h1>
      </div>
      {Object.values(errors).length > 0 && (
        <div className="form-errors">
          {errors.review && <p>{errors.review}</p>}
          {errors.stars && <p>{errors.stars}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          name="review"
          placeholder="Leave your review here..."
          onChange={inputHandler}
        />
        <div className="review-rating-container">
          {new Array(5).fill(null).map((el, i) => (
            <label
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <input
                name={"star" + i}
                type="checkbox"
                className="hidden"
                onClick={inputHandler}
              />
              <i
                key={"star" + i}
                className={`fa-solid fa-star ${i <= filled ? "fill" : ""}`}
              />
            </label>
          ))}
          <p>Stars</p>
        </div>
        <button className="form-button" type="submit">
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
