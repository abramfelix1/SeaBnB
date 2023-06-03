import { useDispatch } from "react-redux";
import { deleteSpot } from "../../../store/spots";
import { deleteReview } from "../../../store/reviews";

import "./form.css";

export default function DeleteForm({ closeModal, id, type, spotId }) {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (type === "review") {
      dispatch(deleteReview(id, spotId));
    } else {
      dispatch(deleteSpot(id));
    }
    closeModal();
  };

  return (
    <div className="form-container">
      <div className="form-header delete">
        <i
          className="fa-solid fa-x"
          onClick={() => {
            closeModal();
          }}
        ></i>
        <h1>Confirm Delete</h1>
      </div>
      <div className="form-sub-header delete">
        <p>Are you sure you want to remove this spot from the listings?</p>
      </div>
      <form onSubmit={submitHandler}>
        <div className="form-buttons-container delete">
          <button className="form-button">Yes (Delete Spot)</button>
          <button
            className="form-button"
            type="button"
            onClick={(e) => closeModal()}
          >
            No (Keep Spot)
          </button>
        </div>
      </form>
    </div>
  );
}
