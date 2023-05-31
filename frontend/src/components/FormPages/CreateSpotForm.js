import "./formPages.css";

export default function CreateSpotForm() {
  return (
    <div className="create-spot-container">
      <div className="create-spot-header-container">
        <div className="create-spot-header">
          <h1>Create a new Spot</h1>
        </div>
      </div>
      <div className="create-spot-form-container">
        <form>
          <div className="section-container">
            <div className="section-header">
              <p>Where's your place located?</p>
              <p>
                Guests will only get your exact address once they booked a
                reservation.
              </p>
            </div>
            <label>
              Country
              <input placeholder="Country" />
            </label>
            <label>
              Street Address
              <input placeholder="Address" />
            </label>
            <div className="city-state">
              <label className="city">
                City
                <input placeholder="City" />
              </label>
              <p>,</p>
              <label className="state">
                State
                <input placeholder="State" />
              </label>
            </div>
            <div className="lat-lng">
              <label className="lat">
                Latitude
                <input placeholder="Latitude" />
              </label>
              <p>,</p>
              <label className="lng">
                Longitude
                <input placeholder="Longitude" />
              </label>
            </div>
          </div>
          <div className="section-container">
            <div className="section-header">
              <p>Describe your place to guests</p>
              <p>
                Mention the best features of your space, any special amentities
                like fast wifi or parking, and what you love about the
                neighborhood.
              </p>
            </div>
            <textarea
              className="text-box"
              placeholder="Please write at least 30 characters."
            />
          </div>
          <div className="section-container">
            <div className="section-header">
              <p>Create a title for your spot</p>
              <p>
                Catch guests' attention with a spot title that highlights what
                makes your place special.
              </p>
            </div>
            $ <input className="name" placeholder="Name of your spot" />
          </div>
          <div className="section-container">
            <div className="section-header">
              <p>Liven up your spot with photos</p>
              <p>Submit a link to at least one photo to publish your spot.</p>
            </div>
            <input className="image" placeholder="Preview Image URL" />
            <input className="image" placeholder="Preview Image URL" />
            <input className="image" placeholder="Preview Image URL" />
            <input className="image" placeholder="Preview Image URL" />
            <input className="image" placeholder="Preview Image URL" />
          </div>
          <div className="button-container">
            <button className="form-button">Create Spot</button>
          </div>
        </form>
      </div>
    </div>
  );
}
