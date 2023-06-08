import React from 'react';

const SpotDetails = ({ spot }) => {
  console.log(spot);
  const { name, city, state, country, previewImage, images, firstName, lastName, description, price } = spot;

  const reserveSpot = () => {
    alert('Feature coming soon');
  };

  return (
    <div className="spot-details-container">
      <div className="spot-name">{name}</div>
      <div className="spot-location">{`${city}, ${state}, ${country}`}</div>
      <div className="spot-photos">
        <div className="preview-image">
          <img src={previewImage} alt="Spot Preview" />
        </div>
        <div className="additional-images">
          {images.map((image, index) => (
            <div className="additional-image" key={index}>
              <img src={image} alt={`Spot Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="hosted-by">
        Hosted by {firstName} {lastName}
      </div>
      <div className="spot-description">{description}</div>
      <div className="spot-price">
        <span className="spot-price-value">${price}</span>
        <span>night</span>
      </div>
      <button className="reserve-button" onClick={reserveSpot}>
        Reserve
      </button>
    </div>
  );
};

export default SpotDetails;
