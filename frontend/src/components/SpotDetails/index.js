import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSpotDetails } from '../../store/spots';

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots[id]);

  useEffect(() => {
    dispatch(getSpotDetails(id));
  }, [dispatch, id]);

  const reserveSpot = () => {
    alert('Feature coming soon');
  };

  console.log(spot.Owner);

  return spot && ( 
    <div className="spot-details-container">
      <div className="spot-name">{spot.name}</div>
      <div className="spot-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
      <div className="spot-photos">
        <div className="preview-image">
          <img src={spot.previewImage} alt="Spot Preview" />
        </div>
        <div className="additional-images">
          {spot.SpotImages.map((image, index) => (
            <div className="additional-image" key={index}>
              <img src={image} alt={`Spot Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="hosted-by">
        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
      </div>
      <div className="spot-description">{spot.description}</div>
      <div className="spot-price">
        <span className="spot-price-value">${spot.price}</span>
        <span>night</span>
      </div>
      <button className="reserve-button" onClick={reserveSpot}>
        Reserve
      </button> */}
    </div>
  );
};

export default SpotDetails;
