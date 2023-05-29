import LoginForm from "./Forms/LoginForm";
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
        <LoginForm closeModal={closeModal} />
      </div>
    </div>
  );
}
