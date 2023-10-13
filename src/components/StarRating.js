import React from "react";

const StarRating = ({ value }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className="star full-star">
          &#9733;
        </span>
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="star half-star">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star empty-star">
          &#9733;
        </span>
      );
    }
  }

  return (
    <div className="stars-container">
      <div className="star-rating">{stars}</div>
    </div>
  );
};

export default StarRating;
