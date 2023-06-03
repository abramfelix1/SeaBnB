import "./form.css";

export default function DeleteForm({ closeModal }) {
  return (
    <div className="form-container">
      <div className="form-header delete">
        <i
          className="fa-solid fa-x"
          onClick={() => {
            closeModal();
          }}
        ></i>
        <h1>Confirm Delete</h1>
      </div>
      <div className="form-sub-header delete">
        <p>Are you sure you want to remove this spot from the listings?</p>
      </div>
      <form>
        <div className="form-buttons-container delete">
          <button className="form-button" type="button">
            Yes (Delete Spot)
          </button>
          <button className="form-button" type="button">
            No (Keep Spot)
          </button>
        </div>
      </form>
    </div>
  );
}
