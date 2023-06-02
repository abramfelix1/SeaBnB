import { useState } from "react";
import LoginForm from "./Forms/LoginForm";
import "./Modal.css";

export default function LoginFormModal({ closeModal }) {
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
        <LoginForm closeModal={closeModal} />
      </div>
    </div>
  );
}
