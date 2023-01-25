import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
function RatingStars({ rating }) {
  // get number after coma
  const digitsAfterDecimal = (rating) => {
    if (Number.isInteger(rating)) {
      return 0;
    }
    const arr = rating.toString().split(".");
    return arr[1] ? arr[1].length : 0;
  };
   
  // Calculation starts 
  const filledStars = Math.floor(rating);
  const partFilledStar = digitsAfterDecimal(rating);
  // Arrays for Stars
  const arrayFilledStars = Array(filledStars);
  var arrayPartFilledStar = 0;
  var arrayEmptyStars = 0;
  if (partFilledStar > 0) {
    arrayPartFilledStar = Array(partFilledStar);
    arrayEmptyStars = Array(5 - (filledStars + 1));
  } else {
    arrayEmptyStars = Array(5 - filledStars);
  }

  return (
    <div className='rating'>
      <div className='star'>
        {/* Filled Starts */}
        {arrayFilledStars.length > 0 &&
          arrayFilledStars.fill(0).map((st,index) => <BsStarFill  key={index} />)}
          {/* Part Stars */}
        {arrayPartFilledStar.length > 0 &&
          arrayPartFilledStar.fill(0).map((st,index) => <BsStarHalf  key={index} />)}
          {/* Empty Stars */}
        {arrayEmptyStars.length > 0 &&
          arrayEmptyStars.fill(0).map((st,index) => <BsStar   key={index}/>)}
      </div>
    </div>
  );
}

export default RatingStars;
