

import React, { useState } from 'react';
import { Rating, Typography, Box } from '@mui/material';


const RatingContainer = () => {
    // State to keep track of the selected rating
    const [rating, setRating] = useState(0);
  
    // Function to handle rating change
    const handleRatingChange = (event, newValue) => {
      setRating(newValue);
    };
  
    return (
      
        <Rating
          name="opportunity-rating"
          value={rating}
          precision={1} // Set precision to 1 so that the stars can be rated with increments of 1 (1, 2, 3, 4, or 5)
          onChange={handleRatingChange}
          max={5}
        />
    
    );
  };

  export default RatingContainer
  