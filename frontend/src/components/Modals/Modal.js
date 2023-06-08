import { useState } from "react";
import LoginForm from "./Forms/LoginForm";
import ReviewForm from "./Forms/ReviewForm";
import SignupForm from "./Forms/SignupForm";
import DeleteForm from "./Forms/DeleteForm";
import BookingForm from "./Forms/BookingForm";

import "./Modal.css";

export default function Modal({ closeModal, type, action, id, spotId }) {
  const [formClicked, setFormClicked] = useState(false);

  const forms = {
    login: <LoginForm closeModal={closeModal} />,
    signup: <SignupForm closeModal={closeModal} />,
    review: <ReviewForm closeModal={closeModal} type={action} currentId={id} />,
    delete: (
      <DeleteForm
        closeModal={closeModal}
        type={action}
        id={id}
        spotId={spotId}
      />
    ),
    booking: <BookingForm closeModal={closeModal} />,
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal" && formClicked === false) {
      closeModal(false);
    }
    setFormClicked(false);
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div
        className="modal-content"
        onMouseDown={() => setFormClicked(true)}
        onMouseUp={() => setFormClicked(false)}
      >
        {forms[type]}
      </div>
    </div>
  );
}
