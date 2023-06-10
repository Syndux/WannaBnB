const SpotDesc = ({ spot }) => {
  return (
    <div className="spot-desc-container">
      <div className="hosted-by">
        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
      </div>
      <div className="spot-desc">
        {spot.description}
      </div>
    </div>
  );
};

export default SpotDesc;
