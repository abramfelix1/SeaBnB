import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot, deleteSpot } from "../../store/spots";
import { createImage } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./formPages.css";

export default function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState({ url: null, preview: true });
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [errors, setErrors] = useState({});

  const resetError = (prevState, name) => {
    const newState = { ...prevState };
    delete newState[name];
    return newState;
  };

  const inputHandler = (e) => {
    if (e.target.name === "country") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setCountry(e.target.value);
    }
    if (e.target.name === "city") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setCity(e.target.value);
    }
    if (e.target.name === "address") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setAddress(e.target.value);
    }
    if (e.target.name === "state") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setState(e.target.value);
    }
    if (e.target.name === "latitude") {
      setErrors((prevState) => resetError(prevState, "lat"));
      setLatitude(e.target.value);
    }
    if (e.target.name === "longitude") {
      setErrors((prevState) => resetError(prevState, "lng"));
      setLongitude(e.target.value);
    }
    if (e.target.name === "description") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setDescription(e.target.value);
    }
    if (e.target.name === "name") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setName(e.target.value);
    }
    if (e.target.name === "price") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setPrice(e.target.value);
    }
    if (e.target.name === "preview") {
      setErrors((prevState) => resetError(prevState, "url"));
      setPreview({ url: e.target.value, preview: true });
    }
    if (e.target.name === "image1") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setImage1({ url: e.target.value, preview: false });
    }
    if (e.target.name === "image2") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setImage2({ url: e.target.value, preview: false });
    }
    if (e.target.name === "image3") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setImage3({ url: e.target.value, preview: false });
    }
    if (e.target.name === "image4") {
      setErrors((prevState) => resetError(prevState, e.target.name));
      setImage4({ url: e.target.value, preview: false });
    }
  };

  const submitHandler = (e) => {
    const payload = {
      country,
      address,
      city,
      state,
      latitude,
      longitude,
      description,
      price,
    };

    const filteredImages = [image1, image2, image3, image4].filter(
      (el) => el !== null && el.url !== ""
    );

    const imageList = [preview, ...filteredImages];

    let spotId = null;

    const submit = async () => {
      e.preventDefault();

      try {
        spotId = await dispatch(createSpot(payload));
      } catch (err) {
        const data = await err.json();
        setErrors(data.errors);
      }

      if (spotId) {
        try {
          for (const img of imageList) {
            await dispatch(createImage(spotId, img));
          }
          history.push(`/spots/${spotId}`);
        } catch (err) {
          const error = await err.json();
          setErrors((prevState) => ({ ...prevState, ...error.errors }));
          if (Object.values(errors).length > 0) {
            dispatch(deleteSpot(spotId));
          }
        }
      }
    };
    submit();
  };

  return (
    <div className="create-spot-container">
      <div className="create-spot-header-container">
        <div className="create-spot-header">
          <h1>Create a new Spot</h1>
        </div>
      </div>
      <div className="create-spot-form-container">
        <form onSubmit={submitHandler}>
          <div className="section-container">
            <div className="section-header">
              <p>Where's your place located?</p>
              <p>
                Guests will only get your exact address once they booked a
                reservation.
              </p>
            </div>
            <label>
              <p>
                Country{" "}
                {errors.country && (
                  <span className="form-errors">{errors.country}</span>
                )}
              </p>
              <input
                name="country"
                placeholder="Country"
                onChange={inputHandler}
              />
            </label>

            <label>
              <p>
                Street Address{" "}
                {errors.address && (
                  <span className="form-errors">{errors.address}</span>
                )}
              </p>
              <input
                name="address"
                placeholder="Address"
                onChange={inputHandler}
              />
            </label>
            <div className="city-state">
              <label className="city">
                <p>
                  City{" "}
                  {errors.city && (
                    <span className="form-errors">{errors.city}</span>
                  )}
                </p>
                <input name="city" placeholder="City" onChange={inputHandler} />
              </label>
              <p className="comma">,</p>
              <label className="state">
                <p>
                  State{" "}
                  {errors.state && (
                    <span className="form-errors">{errors.state}</span>
                  )}
                </p>
                <input
                  name="state"
                  placeholder="State"
                  onChange={inputHandler}
                />
              </label>
            </div>
            <div className="lat-lng">
              <label className="lat">
                {!errors.lat && <p>Latitude (Optional)</p>}{" "}
                {errors.lat && (
                  <p>
                    Latitude <span className="form-errors">{errors.lat}</span>
                  </p>
                )}{" "}
                <input
                  name="latitude"
                  placeholder="Latitude"
                  onChange={inputHandler}
                />
              </label>
              <p className="comma">,</p>
              <label className="lng">
                {!errors.lng && <p>Longitude (Optional)</p>}{" "}
                {errors.lng && (
                  <p>
                    Longitude <span className="form-errors">{errors.lng}</span>
                  </p>
                )}{" "}
                <input
                  name="longitude"
                  placeholder="Longitude"
                  onChange={inputHandler}
                />
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
            <div className="no-label-inputs">
              <textarea
                name="description"
                className="text-box"
                placeholder="Please write at least 30 characters."
                onChange={inputHandler}
              />
            </div>
            {errors.description && (
              <span className="form-errors">{errors.description}</span>
            )}
          </div>
          <div className="section-container">
            <div className="section-header">
              <p>Create a title for your spot</p>
              <p>
                Catch guests' attention with a spot title that highlights what
                makes your place special.
              </p>
            </div>
            <div className="no-label-inputs">
              <input
                className="name"
                name="name"
                placeholder="Name of your spot"
                onChange={inputHandler}
              />
            </div>
            {errors.name && <span className="form-errors">{errors.name}</span>}
          </div>
          <div className="section-container">
            <div className="section-header">
              <p>Set a base price for your spot</p>
              <p>
                Competitive pricing can help your listing stand out and rank
                higher in search results.
              </p>
            </div>
            <div className="no-label-inputs">
              ${" "}
              <input
                className="price"
                name="price"
                placeholder="Price per night (USD)"
                onChange={inputHandler}
              />
            </div>
            {errors.price && (
              <span className="form-errors">{errors.price}</span>
            )}
          </div>
          <div className="section-container">
            <div className="section-header">
              <p>Liven up your spot with photos</p>
              <p>Submit a link to at least one photo to publish your spot.</p>
            </div>
            {errors.url && <span className="form-errors">{errors.url}</span>}
            <input
              name="preview"
              className="image"
              placeholder="Preview Image URL"
              onChange={inputHandler}
            />
            {new Array(4).fill(null).map((el, i) => (
              <input
                key={i + "create-spot"}
                name={`image${i + 1}`}
                className="image"
                placeholder="Image URL (Optional)"
                onChange={inputHandler}
              />
            ))}
          </div>
          <div className="button-container">
            <button className="form-button">Create Spot</button>
          </div>
        </form>
      </div>
    </div>
  );
}
