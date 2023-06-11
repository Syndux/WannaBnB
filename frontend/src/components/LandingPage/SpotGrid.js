import React from 'react';
import { Link } from "react-router-dom";

import SpotTile from './SpotTile';

const SpotGrid = ({ spots, manage }) => {
  const spotsArr = Object.values(spots).reverse();

  return (
    <div className="spot-grid">
      {spotsArr.map((spot) => (
        <Link to={`/spots/${spot.id}`}>
          <SpotTile key={spot.id} spot={spot} />
        </Link>
      ))}
    </div>
  );
};

export default SpotGrid;