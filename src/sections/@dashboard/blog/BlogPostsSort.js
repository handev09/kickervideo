import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';

BlogPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function BlogPostsSort({ options, onSort }) {
  const [selectedSortOption, setSelectedSortOption] = useState('latest'); // Initialize with a default value

  const handleSortChange = (event) => {
    const newSelectedSortOption = event.target.value;
    setSelectedSortOption(newSelectedSortOption); // Update the selectedSortOption state
    onSort(newSelectedSortOption); // Call the onSort function with the selected value
  };

  return (
    <TextField
      sx={{ width: '100%' }}
      select
      size="medium"
      value={selectedSortOption} // Bind the value to the selectedSortOption state
      onChange={handleSortChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
