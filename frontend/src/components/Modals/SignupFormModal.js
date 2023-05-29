import SignupForm from "./Forms/SignupForm";

export default function SignupFormModal({ closeModal }) {
  const handleClick = (e) => {
    e.stopPropagation();
    console.log(e.target.className);
    if (e.target.className === "modal") {
      closeModal(false);
    }
  };

  return (
    <div className="modal" onClick={handleClick}>
      <SignupForm closeModal={closeModal} />
    </div>
  );
}
