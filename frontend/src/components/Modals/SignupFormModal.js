import { useState } from "react";
import SignupForm from "./Forms/SignupForm";

export default function SignupFormModal({ closeModal }) {
  const [formClicked, setFormClicked] = useState(false);

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
        <SignupForm closeModal={closeModal} />
      </div>
    </div>
  );
}
