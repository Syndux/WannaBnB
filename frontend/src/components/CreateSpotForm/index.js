import React from "react";
import "./CreateSpotForm.css"; // Import the CSS file

function CreateSpotForm() {
  return (
    <div className="spot-create-outer-container">
      <div className="spot-create-inner-container">
        <h1 className="form-heading">Create a New Spot</h1>

        <div className="spot-create-section-header">
          <p className="subheading">Where's your place located?</p>
          <p className="description">
            Guests will only get your exact address once they booked a reservation.
          </p>
        </div>

        <div className="spot-create-section">
          <form>
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" />

            <label htmlFor="street">Street Address:</label>
            <input type="text" id="street" />

            <label htmlFor="city">City:</label>
            <input type="text" id="city" />

            <label htmlFor="state">State:</label>
            <input type="text" id="state" />

            <label htmlFor="latitude">Latitude:</label>
            <input type="text" id="latitude" />

            <label htmlFor="longitude">Longitude:</label>
            <input type="text" id="longitude" />

            <button type="submit">Create Spot</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSpotForm;
