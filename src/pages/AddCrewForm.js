import {useState} from 'react';

import {
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Container,
} from '@mui/material';

const AddCrewForm = () => {
    const [employmentType, setEmploymentType] = useState('');

    const handleEmploymentTypeChange = (event) => {
        setEmploymentType(event.target.value);
      };
  return (
    <form>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Add Crew
      </Typography>

      {/* Subtitle */}
      <Typography variant="h6" gutterBottom>
        Profile Details
      </Typography>

      <FormControl component="fieldset" sx={{width: '100%'}}>
        <RadioGroup
          aria-label="employmentType"
          name="employmentType"
          value={employmentType}
          onChange={handleEmploymentTypeChange}
        >
          <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <Container sx={{border: '1px solid #000', p:5, borderRadius: '8px'}}>
            <FormControlLabel
              value="Full time"
              control={<Radio />}
              label="Full time"
              sx={{ ml: 2, mr: 1, borderRadius: '8px' }}
            />
            </Container>

            <Container sx={{border: '1px solid #000', p:5, borderRadius: '8px', }}>
            <FormControlLabel
              value="Part time"
              control={<Radio />}
              label="Part time"
              sx={{ mr: 1, borderRadius: '8px' }}
            />
            </Container>

            <Container sx={{border: '1px solid #000', p:5, borderRadius: '8px'}}>
            <FormControlLabel
              value="Freelancer / Contractor"
              control={<Radio />}
              label="Freelancer / Contractor"
              sx={{ borderRadius: '8px' }}
            />
            </Container>
          </Container>
        </RadioGroup>
      </FormControl>

      {/* Input Boxes */}
      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: '10px',
        //   maxWidth: '800px',
          marginBottom: '20px',
        }}
      >
        <TextField label="Name" variant="outlined" margin="normal" sx={{width: '30%'}} />
        <TextField label="Email" variant="outlined" margin="normal" sx={{width: '30%'}} />
        <TextField label="Phone" variant="outlined" margin="normal" sx={{width: '30%'}} />
        <TextField label="Address" variant="outlined" margin="normal" sx={{width: '30%'}} />
        <TextField label="City" variant="outlined" margin="normal" sx={{width: '30%'}} />
        <FormControl variant="outlined" sx={{width: '30%'}}>
        <InputLabel>Position</InputLabel>
        <Select label="Position">
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
        </Select>
      </FormControl>
      </Container>

    
  
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        {/* ... Dropdown and input fields as before ... */}
        <FormControl variant="outlined" style={{ marginRight: 20 }}>
          <InputLabel>Dropdown</InputLabel>
          <Select label="Dropdown">
            <MenuItem value="Option1">Option 1</MenuItem>
            <MenuItem value="Option2">Option 2</MenuItem>
            <MenuItem value="Option3">Option 3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Cost"
          variant="outlined"
          margin="normal"
          style={{ marginRight: 20 }}
        />
        <TextField
          label="Markup"
          variant="outlined"
          margin="normal"
          style={{ marginRight: 20 }}
        />
        <TextField label="Total" variant="outlined" margin="normal" />

      </Container>
    </form>
  );
};

export default AddCrewForm;



