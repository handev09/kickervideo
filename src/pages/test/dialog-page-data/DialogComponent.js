import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const DialogComponent = ({ openDialog, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClose = () => {
    // Pass the entered data back to the main component
    onClose(inputValue);
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <div>
        <TextField
          label="Enter something"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleClose}>Save</Button>
      </div>
    </Dialog>
  );
};

export default DialogComponent;
