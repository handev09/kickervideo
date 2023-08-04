import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

const UnitPriceCalculator = () => {
  const [cost, setCost] = useState('');
  const [markup, setMarkup] = useState('');
  const [unitPrice, setUnitPrice] = useState('');

  // Function to calculate the unit price based on cost and markup percentage
  const calculateUnitPrice = () => {
    const costValue = parseFloat(cost);
    const markupValue = parseFloat(markup);

    if (!isNaN(costValue) && !isNaN(markupValue)) {
      const unitPriceValue = costValue + (costValue * markupValue) / 100;
      setUnitPrice(unitPriceValue.toFixed(2));
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* Cost */}
      <Grid item xs={4}>
        <Typography variant="subtitle1">Cost</Typography>
        <Typography variant="body1" sx={{ border: '1px solid #ccc', p: 1 }}>
          ${cost}
        </Typography>
      </Grid>

      {/* Markup */}
      <Grid item xs={4}>
        <Typography variant="subtitle1">Markup (%)</Typography>
        <Typography variant="body1" sx={{ border: '1px solid #ccc', p: 1 }}>
          {markup}%
        </Typography>
      </Grid>

      {/* Unit Price */}
      <Grid item xs={4}>
        <Typography variant="subtitle1">Unit Price</Typography>
        <Typography variant="body1" sx={{ border: '1px solid #ccc', p: 1 }}>
          ${unitPrice}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UnitPriceCalculator;
