import { TableCell, Button } from '@mui/material';

const StateIndicator = ({ status }) => {
  return (
    <TableCell align="left">
      <Button
        sx={{
          padding: '10px', // Adjust the padding as needed
          backgroundColor:
            status === 'Active' ? '#1DD75BFF' : // Green for Active state
            status === 'Draft' ? '#f44336' : // Red for Inactive state
            status === 'Pending' ? '#ff9800' : // Orange for Pending state
            '#000', // Default color if the status doesn't match any of the above
          color: '#fff', // Text color
          borderRadius: '4px', // Rounded corners
        }}
      >
        {status}
      </Button>
    </TableCell>
  );
};

export default StateIndicator;
