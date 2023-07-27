import { useState } from "react";

import {
  Typography,
  FormControlLabel,
  
  TextField,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Container,
  Divider
} from "@mui/material";
import ArrowDown from "../components/custom-icons/arrow-down/arrowDown";

const AddCrewForm = () => {
  const [employmentType, setEmploymentType] = useState("");

  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
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

      <FormControl component="fieldset" sx={{ width: "100%", marginBottom: '31px' }}>
        <RadioGroup
          aria-label="employmentType"
          name="employmentType"
          value={employmentType}
          onChange={handleEmploymentTypeChange}
        >
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Container
              sx={{ border: "1px solid #000", p: 5, borderRadius: "8px" }}
            >
              <FormControlLabel
                value="Full time"
                control={<Radio />}
                label="Full time"
                sx={{ ml: 2, mr: 1, borderRadius: "8px" }}
              />
            </Container>

            <Container
              sx={{ border: "1px solid #000", p: 5, borderRadius: "8px" }}
            >
              <FormControlLabel
                value="Part time"
                control={<Radio />}
                label="Part time"
                sx={{ mr: 1, borderRadius: "8px" }}
              />
            </Container>

            <Container
              sx={{ border: "1px solid #000", p: 5, borderRadius: "8px" }}
            >
              <FormControlLabel
                value="Freelancer / Contractor"
                control={<Radio />}
                label="Freelancer / Contractor"
                sx={{ borderRadius: "8px" }}
              />
            </Container>
          </Container>
        </RadioGroup>
      </FormControl>

      <Divider sx={{mb: '25px', mt: '31px'}} />

      {/* Input Boxes */}
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "10px",
          //   maxWidth: '800px',
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Full Name"
          variant="outlined"
          margin="normal"
          sx={{ width: "30%" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          sx={{ width: "30%" }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          margin="normal"
          sx={{ width: "30%" }}
        />
        <TextField
          label="Address"
          variant="outlined"
          margin="normal"
          sx={{ width: "30%" }}
        />
        <TextField
          label="Street"
          variant="outlined"
          margin="normal"
          sx={{ width: "30%" }}
        />

<TextField
          label="State / Province"
          variant="outlined"
          margin="normal"
          sx={{ width: "30%" }}
        />

<TextField
          label="City"
          variant="outlined"
          margin="normal"
          sx={{ width: "30%" }}
        />

<TextField
          label="Zip / Postal Code"
          variant="outlined"
          margin="normal"
          sx={{ width: "30%" }}
        />
      </Container>

      <Container sx={{ display: "flex", alignItems: "center",  mt: 10}}>
        {/* ... Dropdown and input fields as before ... */}
        <FormControl variant="outlined" style={{ marginRight: 20 }} sx={{width: '20%'}}>
          <InputLabel>Rate</InputLabel>
          <Select label="Dropdown">
            <MenuItem value="Option1">Hour</MenuItem>
            <MenuItem value="Option2">Day</MenuItem>
            <MenuItem value="Option3">Half Day</MenuItem>
            <MenuItem value="Option3">Flat</MenuItem>
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
