import ReviewForm from "./Forms/ReviewForm";

export default function ReviewFormModal({ closeModal }) {
  const handleClick = (e) => {
    e.stopPropagation();
    console.log(e.target.className);
    if (e.target.className === "modal") {
      closeModal(false);
    }
  };

  return (
    <div className="modal" onClick={handleClick}>
      <ReviewForm closeModal={closeModal} />
    </div>
  );
}
