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
  Button,
  Box,
  Divider,
} from "@mui/material";

import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import MyDropdown from "../components/dropdown/DropDown";

const AddCrewForm = () => {
  const dropdownOptions = ["Hour", "Day", "Half Day", "Flat"];
  const [employmentType, setEmploymentType] = useState("");

  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
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

      <FormControl
        component="fieldset"
        sx={{ width: "100%", marginBottom: "31px" }}
      >
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

      <Divider sx={{ mb: "25px", mt: "31px" }} />

      {/* Input Boxes */}
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "20px",
          //   maxWidth: '800px',
          marginBottom: "20px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Full name
          </Typography>
          <input
            type="text"
            placeholder="Full Name or company name"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold"
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Phone
          </Typography>
          <input
            type="text"
            placeholder="Phone"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold"
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Email
          </Typography>
          <TextField
            placeholder="Email"
            variant="outlined"
            size="small"
            sx={{ width: "100%", backgroundColor: "#F3F4F6FF" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Address
          </Typography>
          <TextField
            placeholder="Address"
            variant="outlined"
            size="small"
            sx={{ width: "100%", backgroundColor: "#F3F4F6FF" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Street
          </Typography>
          <TextField
            placeholder="Street"
            variant="outlined"
            size="small"
            sx={{ width: "100%", backgroundColor: "#F3F4F6FF" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            State / Province
          </Typography>
          <TextField
            placeholder="State / Province"
            variant="outlined"
            size="small"
            sx={{ width: "100%", backgroundColor: "#F3F4F6FF" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            City
          </Typography>
          <TextField
            placeholder="City"
            variant="outlined"
            size="small"
            sx={{ width: "100%", backgroundColor: "#F3F4F6FF" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Ward
          </Typography>
          <TextField
            placeholder="Zip / Postal code"
            variant="outlined"
            size="small"
            sx={{ width: "100%", backgroundColor: "#F3F4F6FF" }}
          />
        </Box>
      </Container>

      <Container
        sx={{ display: "flex", alignItems: "center", mt: 10, gap: "20px" }}
      >
        {/* ... Dropdown and input fields as before ... */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            RATE
          </Typography>
          <MyDropdown
            options={dropdownOptions}
            value={employmentType} // Set the value to your state
            onChange={handleOptionChange}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1">COST</Typography>
          <TextField
            placeholder="0.00"
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1">MARKUP</Typography>
          <TextField
            placeholder="0.00"
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            TOTAL
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            0.00
          </Typography>
        </Box>
      </Container>

      <Divider sx={{ mb: "25px", mt: "31px" }} />

      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "150px",
          width: "100%",
          padding: "10px",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
          <Button
            variant="filled"
            sx={{ backgroundColor: "#F3F4F6FF", color: "#565E6CFF" }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "#E05858FF",
              color: "#fff",
              borderRadius: "3px",
            }}
            variant="filled"
            endIcon={<ExpandMoreIcon />}
            // onClick={handleClick}
          >
            SAVE
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default AddCrewForm;
