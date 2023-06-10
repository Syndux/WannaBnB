const SpotDesc = ({spot}) => {
  return (
    <div className="hosted-by">
      Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
    </div>
  )
};

export default SpotDesc;
