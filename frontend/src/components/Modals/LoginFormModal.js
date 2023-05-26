import LoginFormPage from "../LoginFormPage";
import "./Modal.css";

export default function LoginFormModal({ setShowModal }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal") {
      setShowModal(false);
    }
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal-content">
        <LoginFormPage />
      </div>
    </div>
  );
}
