import React, { useState } from 'react';
import DialogComponent from './DialogComponent'; // Replace with the actual path to your dialog component

const MainComponent = () => {
  const [dialogData, setDialogData] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // Add this state for controlling the dialog

  const handleDialogData = (data) => {
    setDialogData(data);
    setOpenDialog(false); // Close the dialog after data is received
  };

  return (
    <div>
      {/* Display the data from the dialog */}
      <p>Data entered in the dialog: {dialogData}</p>

      {/* Open the dialog when a button is clicked */}
      <button onClick={() => setOpenDialog(true)}>Open Dialog</button>

      {/* Render the dialog component */}
      <DialogComponent openDialog={openDialog} onClose={handleDialogData} />
    </div>
  );
};

export default MainComponent;
