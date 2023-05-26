import SignupFormPage from "../SignupFormPage";

export default function SignupFormModal({ setShowModal }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal") {
      setShowModal(false);
    }
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal-content">
        <SignupFormPage />
      </div>
    </div>
  );
}
