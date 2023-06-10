import React from 'react';
import SpotTile from './SpotTile';

const SpotGrid = ({ spots }) => {
  const spotsArr = Object.values(spots).reverse();

  return (
    <div className="spot-grid">
      {spotsArr.map((spot) => (
        <SpotTile key={spot.id} spot={spot} />
      ))}
    </div>
  );
};

export default SpotGrid;