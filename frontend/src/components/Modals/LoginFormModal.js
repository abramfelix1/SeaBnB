import LoginFormPage from "../LoginFormPage";
import "./Modal.css";

export default function LoginFormModal({ closeModal }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal") {
      closeModal(false);
    }
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal-content">
        <LoginFormPage closeModal={closeModal} />
      </div>
    </div>
  );
}
