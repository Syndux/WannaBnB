import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  loadAllSpots,
  createSpot,
  editSpot,
  getSpotDetails,
} from "../../store/spots";
import "./SpotForm.css";

function SpotForm({ isEdit }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllSpots());
      setIsRendered(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    const fetchSpotDetails = async (id) => {
      await dispatch(getSpotDetails(id));
    };

    if (isEdit && spot && !spot.SpotImages) {
      fetchSpotDetails(id);
    }

    if (spot) {
      setCountry(spot.country || "");
      setAddress(spot.address || "");
      setCity(spot.city || "");
      setState(spot.state || "");
      setLatitude(spot.lat || "");
      setLongitude(spot.lng || "");
      setDescription(spot.description || "");
      setName(spot.name || "");
      setPrice(spot.price || "");

      if (spot.SpotImages) {
        const previewImage = spot.SpotImages.find((image) => image.preview);
        const additionalImages = spot.SpotImages.filter((image) => !image.preview);

        setPreviewImage(previewImage?.url || "");
        additionalImages.forEach((image, index) => {
          if (index === 0) setImage1(image?.url || "");
          if (index === 1) setImage2(image?.url || "");
          if (index === 2) setImage3(image?.url || "");
          if (index === 3) setImage4(image?.url || "");
        });
      }
    }
  }, [isEdit, spot, id, dispatch]);

  const [country, setCountry] = useState(spot?.country || "");
  const [address, setAddress] = useState(spot?.address || "");
  const [city, setCity] = useState(spot?.city || "");
  const [state, setState] = useState(spot?.state || "");
  const [latitude, setLatitude] = useState(spot?.lat || "");
  const [longitude, setLongitude] = useState(spot?.lng || "");
  const [description, setDescription] = useState(spot?.description || "");
  const [name, setName] = useState(spot?.name || "");
  const [price, setPrice] = useState(spot?.price || "");
  const [previewImage, setPreviewImage] = useState(spot?.previewImage || "");
  const [image1, setImage1] = useState(spot?.image1 || "");
  const [image2, setImage2] = useState(spot?.image2 || "");
  const [image3, setImage3] = useState(spot?.image3 || "");
  const [image4, setImage4] = useState(spot?.image4 || "");
  const [formErrors, setFormErrors] = useState({});

  const isValidImageURL = (url) => {
    const validExtensions = [".png", ".jpg", ".jpeg"];
    const extension = url.slice(url.lastIndexOf(".")).toLowerCase();
    return validExtensions.includes(extension);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!country) {
      errors.country = "Country is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!latitude) {
      errors.latitude = "Latitude required";
    } else {
      const latValue = parseFloat(latitude);
      if (isNaN(latValue) || latValue < -90 || latValue > 90) {
        errors.latitude = "Latitude must be a valid number between -90 and 90";
      }
    }
    if (!longitude) {
      errors.longitude = "Longitude required";
    } else {
      const lngValue = parseFloat(longitude);
      if (isNaN(lngValue) || lngValue < -180 || lngValue > 180) {
        errors.longitude = "Longitude must be a valid number between -180 and 180";
      }
    }
    if (description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }
    if (!name) {
      errors.name = "Name is required";
    }
    if (!price) {
      errors.price = "Price is required";
    }
    if (!previewImage) {
      errors.previewImage = "Preview image is required.";
    }
    if (previewImage && !isValidImageURL(previewImage)) {
      errors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image1 && !isValidImageURL(image1)) {
      errors.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image2 && !isValidImageURL(image2)) {
      errors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image3 && !isValidImageURL(image3)) {
      errors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image4 && !isValidImageURL(image4)) {
      errors.image4 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = {
        country,
        address,
        city,
        state,
        lat: latitude,
        lng: longitude,
        description,
        name,
        price,
        images: [
          { url: previewImage, preview: true },
          ...(image1 ? [{ url: image1, preview: false }] : []),
          ...(image2 ? [{ url: image2, preview: false }] : []),
          ...(image3 ? [{ url: image3, preview: false }] : []),
          ...(image4 ? [{ url: image4, preview: false }] : []),
        ],
      };

      let spotId;

      if (isEdit) {
        spotId = await dispatch(editSpot(id, formData));
      } else {
        spotId = await dispatch(createSpot(formData));
      }
      history.push(`/spots/${spotId}`);
    }
  };

  if (isEdit && isRendered && spot) {
    if (!sessionUser || spot.ownerId !== sessionUser.id) {
      return <div className="unauthorized">Not authorized to edit this spot</div>;
    }
  }

  return (
    <div className="spot-create-container">
      <form className="spot-create-form-container" onSubmit={handleSubmit}>
        <h1 className="form-heading">
          {isEdit ? "Update your Spot" : "Create a New Spot"}
        </h1>

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
          <div className="spot-form-city-state-container">
            <div>
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
            </div>
            <div className="spot-form-comma">,</div>
            <div>
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
            </div>
          </div>
          <div className="spot-form-lat-lng-container">
            <div className="spot-form-lat">
              <label htmlFor="latitude">
                Latitude
                {formErrors.latitude && (
                  <span className="error-message-latlng">{formErrors.latitude}</span>
                )}
              </label>
              <input
                type="text"
                id="latitude"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="spot-form-comma">,</div>
            <div className="spot-form-long">
              <label htmlFor="longitude">
                Longitude
                {formErrors.longitude && (
                  <span className="error-message-latlng">{formErrors.longitude}</span>
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
          </div>
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
            <span className="error-message error-description">
              {formErrors.description}
            </span>
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
          <input
            type="text"
            id="name"
            placeholder="Name of your spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formErrors.name && (
            <span className="error-message error-name">{formErrors.name}</span>
          )}
        </div>

        {/* Spot price */}
        <div className="spot-create-section-header">
          <p className="subheading">Set a base price for your spot</p>
          <p className="description">
            Competitive price can help your listing stand out and rank higher in
            search results.
          </p>
        </div>
        <div className="spot-create-section">
          <div className="input-price-container">
            $
            <input
              type="number"
              id="price"
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {formErrors.price && (
            <span className="error-message error-price">{formErrors.price}</span>
          )}
        </div>

        {/* Spot photos */}
        <div className="spot-create-section-header">
          <p className="subheading">Liven up your spot with photos</p>
          <p className="description">
            Submit a link to at least one photo to publish your spot.
          </p>
        </div>
        <div className="spot-create-section">
          <input
            type="url"
            id="preview-image"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
          {formErrors.previewImage && (
            <span className="error-message error-image">
              {formErrors.previewImage}
            </span>
          )}
          <input
            type="url"
            id="image-1"
            placeholder="Image URL"
            value={image1}
            onChange={(e) => setImage1(e.target.value)}
          />
          {formErrors.image1 && (
            <span className="error-message error-image">{formErrors.image1}</span>
          )}
          <input
            type="url"
            id="image-2"
            placeholder="Image URL"
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
          />
          {formErrors.image2 && (
            <span className="error-message error-image">{formErrors.image2}</span>
          )}
          <input
            type="url"
            id="image-3"
            placeholder="Image URL"
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
          />
          {formErrors.image3 && (
            <span className="error-message error-image">{formErrors.image3}</span>
          )}
          <input
            type="url"
            id="image-4"
            placeholder="Image URL"
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
          />
          {formErrors.image4 && (
            <span className="error-message error-image">{formErrors.image4}</span>
          )}
        </div>

        <div className="button-container">
          <button className="spot-create-button" type="submit">
            {isEdit ? "Update your Spot" : "Create Spot"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpotForm;
