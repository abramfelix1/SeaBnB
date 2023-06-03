import { useState } from "react";
import LoginForm from "./Forms/LoginForm";
import ReviewForm from "./Forms/ReviewForm";
import SignupForm from "./Forms/SignupForm";
import DeleteForm from "./Forms/DeleteForm";

import "./Modal.css";

export default function Modal({ closeModal, type }) {
  const [formClicked, setFormClicked] = useState(false);
  console.log("A");
  const forms = {
    login: <LoginForm closeModal={closeModal} />,
    signup: <SignupForm closeModal={closeModal} />,
    review: <ReviewForm closeModal={closeModal} />,
    delete: <DeleteForm closeModal={closeModal} />,
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
