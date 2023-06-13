const SpotImages = ({ spot }) => {
  if (!spot.SpotImages) {
    return null;
  }

  const previewImage = spot.SpotImages.find((image) => image.preview);
  const additionalImages = spot.SpotImages.filter((image) => !image.preview);

  return (
    <div className="spot-images">
      <div className="preview-image">
        <img src={previewImage.url} alt="Spot Preview" />
      </div>
      {additionalImages.map((image, index) => (
        <div className="additional-image" key={index}>
          <img src={image.url} alt={`Spot Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default SpotImages;
