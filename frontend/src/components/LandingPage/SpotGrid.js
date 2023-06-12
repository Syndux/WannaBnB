import React from 'react';
import { Link } from "react-router-dom";

import SpotTile from './SpotTile';

const SpotGrid = ({ spots, manage }) => {
  const spotsArr = Object.values(spots).reverse();

  return (
    <div className="spot-grid">
      {spotsArr.map((spot) => (
        <SpotTile key={spot.id} spot={spot} manage={manage} />
      ))}
    </div>
  );
};

export default SpotGrid;