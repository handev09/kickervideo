import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

import {
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import {
  Close as CloseIcon,
  SetMeal, // Import the CloseIcon from @mui/icons-material
} from "@mui/icons-material";
import MyDropdown from "../components/dropdown/DropDown";
import { addClient } from "../state/redux/actions/clients/create";
import { fetchClients } from "../state/redux/actions/clients/fetch";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../components/firebase/firebase-config";

const CreateClient = ({ openDialog, onClose }) => {
  console.log(openDialog);
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [prFullName, setPrFullName] = useState("");
  const [premail, setPrEmail] = useState("");
  const [prPhoneNumber, setPrPhoneNumber] = useState("");
  const [prRole, setPrRole] = useState("");



  const [expenseData, setExpenseData] = useState({
    name: "",
    description: "",
    reimburse: "",
    job: "",
    total: 0,
    date: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const user_id = user.userId;
  const budgets = useSelector((state) => state.budgets.budgets);

  const dropdownJobs = budgets.map((budget) => budget.budget_name);
  const dropdownOptionNames = budgets.map((budget) => budget.client_name);

  const handleClos = () => {
    const newItem = {
      id: uuidv4(),
      companyName: companyName,
      companyEmail: companyEmail,
      phoneNumber: phoneNumber,
      street1: street1,
      street2: street2,
      city: city,
      country: country,
      userId: user_id,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      prId: uuidv4(),
      prName: prFullName,
      prPhone: prPhoneNumber,
      prRole: prRole,
      prEmail: premail,
      isPrimary: true

    };

    dispatch(addClient(newItem)).then(()=>{
      dispatch(fetchClients(user_id))
    }).catch((error)=>{
      console.log(error)
    })
    console.log(newItem);
    onClose(newItem);
    setCompanyName(""); // Reset name state
    setCompanyEmail(""); // Reset description state
    setCountry(""); // Reset optionValue state
    setZip(""); // Reset optionValue state
    setPhoneNumber(""); // Reset optionValue state
    setCity(""); // Reset optionValue state
    setStreet1(""); // Reset optionValue state
    setStreet2(""); // Reset optionValue state
    setPrFullName(""); // Reset optionValue state
    setPhoneNumber(""); // Reset optionValue state
    setPrEmail(""); // Reset optionValue state
    setPrRole(""); // Reset optionValue state
    // setMarkup("");
  };

  const handleNormalClose = () => {
    const newItem = {
      id: "",
      name: "",
      description: "",
      optionValue: "",
      //   unitPrice: "",
      cost: "",
      userId: "",
      //   markup: "",
      // Convert unitPrice to a float number
      // You can add other properties as needed
    };
    console.log(newItem);

    onClose(newItem);
    setCompanyName(""); // Reset name state
    setCompanyEmail(""); // Reset description state
    setCountry(""); // Reset optionValue state
    setZip(""); // Reset optionValue state
    setPhoneNumber(""); // Reset optionValue state
    setCity(""); // Reset optionValue state
    setStreet1(""); // Reset optionValue state
    setStreet2(""); // Reset optionValue state
    setPrFullName(""); // Reset optionValue state
    setPhoneNumber(""); // Reset optionValue state
    setPrEmail(""); // Reset optionValue state
    setPrRole(""); // Reset optionValue state
    // setUnitPrice(""); // Reset unitPrice state

    // setMarkup("");
  };

  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState("");

  //   const handleSearchChange = (event) => {
  //     setSearchValue(event.target.value);
  //   };


  const handleButtonClick = () => {
    // Handle button click action here
    // You can perform a search or any other action
    console.log("Search Value:", searchValue);
    console.log("Form Data:", formData);
    const newItem = {
      id: "",
      name: "",
      description: "",
      optionValue: "",
      //   unitPrice: "",
      cost: "",
      userId: "",
      createClient: true,
      //   markup: "",
      // Convert unitPrice to a float number
      // You can add other properties as needed
    };
    console.log(newItem);

    onClose(newItem);
    setCompanyName(""); // Reset name state
    setCompanyEmail(""); // Reset description state
    setCountry(""); // Reset optionValue state
    setZip(""); // Reset optionValue state
    setPhoneNumber(""); // Reset optionValue state
    setCity(""); // Reset optionValue state
    setStreet1(""); // Reset optionValue state
    setStreet2(""); // Reset optionValue state
    setPrFullName(""); // Reset optionValue state
    setPhoneNumber(""); // Reset optionValue state
    setPrEmail(""); // Reset optionValue state
    setPrRole(""); // Reset optionValue state
  };

  return (
    <form>
      {/* Input Boxes */}
      <Container sx={{ display: "flex", alignItems: "center", mt: 10 }}>
        {/* ... Dropdown and input fields as before ... */}
        <Container>
          {/* Dialog for adding a new service */}
          <Dialog
            open={openDialog}
            onClose={handleNormalClose}
            fullWidth // Make the dialog full width
            maxWidth="md"
            PaperProps={{
              style: {
                minHeight: "90vh", // Set the maximum height of the content area
              },
            }}
          >
            <DialogTitle
              variant="h4"
              sx={{ backgroundColor: "#F3F4F6FF", marginBottom: 5 }}
            >
              Create a New Client
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleNormalClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            {/* ... Dialog content ... */}
            <Container>
              <Typography variant="h6">Client Details</Typography>

              <TextField
                id="filled-textarea"
                label="Company Name"
                placeholder="ex: ABC Company"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="Phone Number"
                placeholder="ex: +1 (254)-765-5756"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="Email"
                placeholder="ex: han@me.co"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={companyEmail}
                onChange={(e) => {
                  setCompanyEmail(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <Typography>Property Details</Typography>

              <TextField
                id="filled-textarea"
                label="Street 1"
                placeholder="ex: 123 Street"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={street1}
                onChange={(e) => {
                  setStreet1(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="Street 2"
                placeholder="ex: Apt #24"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={street2}
                onChange={(e) => {
                  setStreet2(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="City"
                placeholder="ex: Sample City"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="ZIP Code"
                placeholder="ex: 90000"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="Country"
                placeholder="ex: United Kingdom"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              {/* Primary Contact */}
              <Typography>Primary Contact</Typography>

              <TextField
                id="filled-textarea"
                label="Full Name"
                placeholder="ex: Han Tez"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={prFullName}
                onChange={(e) => {
                  setPrFullName(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="Email"
                placeholder="ex: ceo@vbudget.com"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={premail}
                onChange={(e) => {
                  setPrEmail(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="Phone Number"
                placeholder="ex: +1-(255)-453-3746"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={prPhoneNumber}
                onChange={(e) => {
                  setPrPhoneNumber(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

<TextField
                id="filled-textarea"
                label="Role"
                placeholder="ex: CEO"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={prRole}
                onChange={(e) => {
                  setPrRole(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

             

              
            </Container>

            <DialogActions sx={{ marginRight: "40px" }}>
              <Button
                color="primary"
                onClick={handleNormalClose}
                variant="outlined"
                sx={{
                  padding: "8px 25px",
                  borderColor: "#9095A0FF",
                  color: "#9095A0FF",
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleClos}
                color="primary"
                sx={{
                  backgroundColor: "#E05858FF",
                  color: "#fff",
                  borderRadius: "3px",
                  padding: "8px 25px",
                  "&:hover": {
                    opacity: 0.8,
                    backgroundColor: "#E05858FF", // Adjust the opacity value as needed
                  },
                }}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Container>
    </form>
  );
};

export default CreateClient;
