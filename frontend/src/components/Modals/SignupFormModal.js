import SignupFormPage from "../SignupFormPage";

export default function SignupFormModal({ closeModal }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal") {
      closeModal(false);
    }
  };

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal-content">
        <SignupFormPage closeModal={closeModal} />
      </div>
    </div>
  );
}
