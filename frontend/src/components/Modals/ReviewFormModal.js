import { useState } from "react";
import ReviewForm from "./Forms/ReviewForm";

export default function ReviewFormModal({ closeModal }) {
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
        <ReviewForm closeModal={closeModal} />
      </div>
    </div>
  );
}
