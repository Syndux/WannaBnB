import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";

import "./CreateSpotForm.css";

function CreateSpotForm() {
  const dispatch = useDispatch();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (country === "") {
      errors.country = "Country is required";
    }
    if (address === "") {
      errors.address = "Address is required";
    }
    if (city === "") {
      errors.city = "City is required";
    }
    if (state === "") {
      errors.state = "State is required";
    }
    if (latitude === "") {
      errors.latitude = "Latitude is required";
    }
    if (longitude === "") {
      errors.longitude = "Longitude is required";
    }
    if (description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }
    if (name === "") {
      errors.name = "Name is required";
    }
    if (price === "") {
      errors.price = "Price is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = {
        country,
        address,
        city,
        state,
        latitude,
        longitude,
        description,
        name,
        price,
      };
      console.log(formData);

      dispatch(createSpot(formData));
    }
  };

  return (
    <div className="spot-create-container">
      <form className="spot-create-form-container" onSubmit={handleSubmit}>
        {/* Spot location */}
        <div className="spot-create-section-header">
          <p className="subheading">Where's your place located?</p>
          <p className="description">
            Guests will only get your exact address once they booked a reservation.
          </p>
        </div>
        <div className="spot-create-section">
          <label htmlFor="country">
            Country
            {formErrors.country && (
              <span className="error-message">{formErrors.country}</span>
            )}
          </label>
          <input
            type="text"
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <label htmlFor="address">
            Street Address
            {formErrors.address && (
              <span className="error-message">{formErrors.address}</span>
            )}
          </label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="city">
            City
            {formErrors.city && (
              <span className="error-message">{formErrors.city}</span>
            )}
          </label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label htmlFor="state">
            State
            {formErrors.state && (
              <span className="error-message">{formErrors.state}</span>
            )}
          </label>
          <input
            type="text"
            id="state"
            placeholder="STATE"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <label htmlFor="latitude">
            Latitude
            {formErrors.latitude && (
              <span className="error-message">{formErrors.latitude}</span>
            )}
          </label>
          <input
            type="text"
            id="latitude"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />

          <label htmlFor="longitude">
            Longitude
            {formErrors.longitude && (
              <span className="error-message">{formErrors.longitude}</span>
            )}
          </label>
          <input
            type="text"
            id="longitude"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        {/* Spot description */}
        <div className="spot-create-section-header">
          <p className="subheading">Describe your place to guests</p>
          <p className="description">
            Mention the best features of your space, any special amenities like fast
            wifi or parking, and what you love about the neighbordhood.
          </p>
        </div>
        <div className="spot-create-section">
          <textarea
            id="description"
            placeholder="Please write at least 30 characters"
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {formErrors.description && (
            <span className="error-message error-description">{formErrors.description}</span>
          )}
        </div>

        {/* Spot title */}
        <div className="spot-create-section-header">
          <p className="subheading">Create a title for your spot</p>
          <p className="description">
            Catch guests' attention with a spot title that highlights what makes your
            place special.
          </p>
        </div>
        <div className="spot-create-section">
          <input type="text" id="name" placeholder="Name of your spot" />
        </div>

        {/* Spot price */}
        <div className="spot-create-section-header">
          <p className="subheading">Set a base price for your spot</p>
          <p className="description">
            Competitive price can help your listing stand out and rank higher in
            search results.
          </p>
        </div>
        <div className="spot-create-section input-price">
          $ <input type="text" id="price" placeholder="Price per night (USD)" />
        </div>

        {/* Spot photos */}
        <div className="spot-create-section-header">
          <p className="subheading">Liven up your spot with photos</p>
          <p className="description">
            Submit a link to at least one photo to publish your spot.
          </p>
        </div>
        <div className="spot-create-section">
          <input type="url" id="preview-image" placeholder="Preview Image URL" />
          <input type="url" id="image-1" placeholder="Image URL" />
          <input type="url" id="image-2" placeholder="Image URL" />
          <input type="url" id="image-3" placeholder="Image URL" />
          <input type="url" id="image-4" placeholder="Image URL" />
        </div>

        <div className="button-container">
          <button className="spot-create-button" type="submit">
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSpotForm;
