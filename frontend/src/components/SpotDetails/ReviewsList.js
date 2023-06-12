import SingleReview from './SingleReview';

const ReviewsList = ({ reviews }) => {
  
  return (
    <div className="reviews-container">
      {reviews.map((review) => {
        return (
          <SingleReview review={review} key={review.id} />
        )
      })}
    </div>
  )
};

export default ReviewsList;
