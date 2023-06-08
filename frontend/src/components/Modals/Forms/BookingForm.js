import { useDispatch } from "react-redux";

import "./form.css";

export default function BookingForm({ closeModal }) {
  return (
    <div className="form-container">
      <div className="form-header">
        <i
          className="fa-solid fa-x"
          onClick={() => {
            closeModal();
          }}
        ></i>
        <h1>Feature comeing soon</h1>
      </div>
    </div>
  );
}
