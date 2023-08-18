import { useState, useEffect } from "react";

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
  Icon,
} from "@mui/material";

import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import MyDropdown from "../components/dropdown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../state/redux/actions/crew/crewActions";
import { useNavigate } from "react-router-dom";
import Iconify from "../components/iconify/Iconify";

const AddCrewForm = () => {
  const dropdownOptions = ["Hour", "Day", "Half Day", "Flat"];
  const [employmentType, setEmploymentType] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [role, setRole] = useState("");
  const [cost, setCost] = useState("");
  const [markup, setMarkup] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const storedUser = localStorage.getItem('user');
  const user = useSelector(state => state.login.user);
  console.log(user.userId);
  const user_id = user.userId;

  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    street: "",
    state: "",
    city: "",
    zip: "",
    role: "",
    contractType: "",
    cost: 0,
    markup: 0,
    unitPrice: 0,
    userId: user_id,
  });

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      fullName: event.target.value,
    }));
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      phone: event.target.value,
    }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      email: event.target.value,
    }));
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      address: event.target.value,
    }));
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      street: event.target.value,
    }));
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      state: event.target.value,
    }));
  };

  const handlCityChange = (event) => {
    setCity(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      city: event.target.value,
    }));
  };

  const handleCostChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid number (either an integer or a decimal)
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === "") {
      setCost(value);
      setUserData((prevUserData) => ({
        ...prevUserData,
        cost: e.target.value,
      }));
    }
  };

  const handleMarkupChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid integer
    if (/^[0-9]*$/.test(value) || value === "") {
      setMarkup(value);
      setUserData((prevUserData) => ({
        ...prevUserData,
        markup: e.target.value,
      }));
    }
  };

  useEffect(() => {
    if (cost && markup) {
      const calculatedUnitPrice =
        parseFloat(cost) + parseFloat(cost) * (parseFloat(markup) / 100);
      setUnitPrice(calculatedUnitPrice.toFixed(2)); // Round to 2 decimal places
      setUserData((prevUserData) => ({
        ...prevUserData,
        unitPrice: calculatedUnitPrice.toFixed(2),
      }));
    } else {
      setUnitPrice("");
    }
  }, [cost, markup]);

  const navigate = useNavigate();
  // const [budget, setBudget] = useState('');
  const dispatch = useDispatch();

  const handleZipChange = (event) => {
    setZip(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      zip: event.target.value,
    }));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      role: event.target.value,
    }));
  };

  const handleAddUser = () => {
    // Create the budget object
    // console.log(budgetData.client);
    const newUser = {
      fullName: userData.fullName,
      phone: userData.phone,
      email: userData.email,
      address: userData.address,
      street: userData.street,
      state: userData.state,
      city: userData.city,
      zip: userData.zip,
      role: userData.role,
      contractType: userData.contractType,
      cost: userData.cost,
      markup: userData.markup,
      unitPrice: userData.unitPrice,
      userId: userData.userId,
    };

    // Dispatch the new user tothe Redux store
    dispatch(addUser(newUser));

    //Navigate to Home Page
    navigate("/dashboard/user");
  };

  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      contractType: event.target.value,
    }));
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
      <Container>
      <Typography variant="h4" gutterBottom sx={{marginBottom: '30px'}}>
        Add Crew
      </Typography>
      </Container>
      

      {/* Subtitle */}
      <Container>
        <Box sx={{borderBottom: 'solid 5px #E05858FF', maxWidth: '25%', marginBottom: '20px', display: 'flex', gap: '10px'}}>
          <Iconify icon="ri:checkbox-circle-line" color="#E05858FF"/>
        <Typography variant="h6" gutterBottom sx={{color: '#E05858FF'}}>
        Profile Details
      </Typography>
        </Box>

      
      </Container>

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
            value={fullName}
            onChange={handleFullNameChange}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
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
            value={phone}
            onChange={handlePhoneChange}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Email
          </Typography>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Address
          </Typography>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Address"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Street
          </Typography>
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={handleStreetChange}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            State / Province
          </Typography>
          <input
            type="text"
            value={state}
            onChange={handleStateChange}
            placeholder="State / Province"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            City
          </Typography>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={handlCityChange}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Ward
          </Typography>
          <input
            type="text"
            placeholder="Zip / Postal Code"
            value={zip}
            onChange={handleZipChange}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Role
          </Typography>
          <input
            type="text"
            placeholder="ex: Developer"
            value={role}
            onChange={handleRoleChange}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#F3F4F6FF",
              border: "1px solid transparent",
              borderColor: "transparent",
              fontWeight: "bold",
            }}
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
            value={cost}
            type="number"
            onChange={handleCostChange}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1">MARKUP</Typography>
          <TextField
            placeholder="0.00"
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
            value={markup}
            onChange={handleMarkupChange}
            type="number"
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            TOTAL
          </Typography>
          <TextField
            placeholder="0.00"
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
            value={unitPrice}
            type="number"
          />
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
            onClick={handleAddUser}
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
