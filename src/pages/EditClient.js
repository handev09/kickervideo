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
import { updateClient } from "../state/redux/actions/clients/update";
import { deleteClient } from "../state/redux/actions/clients/delete";

const EditClient = ({ openDialog, onClose, initialData }) => {
  console.log(initialData);
  const [companyName, setCompanyName] = useState(initialData?.company_name || "");
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phone_number || "");
  const [companyEmail, setCompanyEmail] = useState(initialData?.email || "");
  const [street1, setStreet1] = useState(initialData?.street_1 || "");
  const [street2, setStreet2] = useState(initialData?.street_2 || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [zip, setZip] = useState(initialData?.zip || "");
  const [country, setCountry] = useState(initialData?.country || "");
 

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

  

  const handleCloseDialog = () => {
    const newItem = {
      id: initialData.client_id,
      companyName: companyName,
      companyEmail: companyEmail,
      phoneNumber: phoneNumber,
      street1: street1,
      street2: street2,
      city: city,
      country: country,
      userId: initialData.user_id,
      zip: zip,
      isEditClientedData: true
    };

    dispatch(updateClient(initialData.client_id,newItem))
      .then(() => {
        dispatch(fetchClients(user_id)).then(()=>{
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
    
    setPhoneNumber(""); // Reset optionValue state
        }).catch((error)=>{console.error(error)})
      })
      .catch((error) => {
        console.log(error);
      });
    
    
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
    setPhoneNumber(""); // Reset optionValue state
    
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
    setPhoneNumber(""); // Reset optionValue state
    
  };

  const handleDeleteClient = (clientId) => {
    console.log(clientId)
    dispatch(deleteClient(clientId)).then(()=>{
      dispatch(fetchClients(initialData.user_id)).then(()=>{
        const newItem = {
          id: "",
          name: "",
          description: "",
          optionValue: "",
          cost: "",
        };
        onClose(newItem)
      })
    })
    
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
              Edit Company Details
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
              <Typography variant="h6">Company Details</Typography>
              {/* <Typography variant="h6">{initialData.client_name}</Typography> */}

             <Box sx={{marginBottom:'20px', marginTop:'20px'}}>
              <Typography>Company Name</Typography>
              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="Company Name"
                size="medium"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid #000",
                    borderRadius: "4px",
                    marginBottom: 0,
                  },
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              </Box>

              <Box sx={{marginBottom:'20px', marginTop:'20px'}}>
              <Typography>Phone Number</Typography>
              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="Phone Number"
                size="medium"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid #000",
                    borderRadius: "4px",
                    marginBottom: 0,
                  },
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              </Box>

              <Box sx={{marginBottom:'20px', marginTop:'20px'}}>
              <Typography>Company Email</Typography>
              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="Company Email"
                size="medium"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid #000",
                    borderRadius: "4px",
                    marginBottom: 0,
                  },
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
              />
              </Box>

              <Typography>Company Address Details</Typography>

              <Box sx={{marginBottom:'20px', marginTop:'20px'}}>
              <Typography>Street</Typography>
              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="Street1"
                size="medium"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid #000",
                    borderRadius: "4px",
                    marginBottom: 0,
                  },
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
                value={street1}
                onChange={(e) => setStreet1(e.target.value)}
              />
              </Box>

              <Box sx={{marginBottom:'20px', marginTop:'20px'}}>
              <Typography>Street Line 2</Typography>
              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="Street 2"
                size="medium"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid #000",
                    borderRadius: "4px",
                    marginBottom: 0,
                  },
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
                value={street2}
                onChange={(e) => setStreet2(e.target.value)}
              />
              </Box>

              <Box sx={{marginBottom:'20px', marginTop:'20px'}}>
              <Typography>City</Typography>
              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="City"
                size="medium"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid #000",
                    borderRadius: "4px",
                    marginBottom: 0,
                  },
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              </Box>
              
              <Box sx={{marginBottom:'20px', marginTop:'20px'}}>
              <Typography>Zip</Typography>
              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="Zip"
                size="medium"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid #000",
                    borderRadius: "4px",
                    marginBottom: 0,
                  },
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              </Box>

              <Box sx={{marginBottom:'20px', marginTop:'20px'}}>
              <Typography>Country</Typography>
              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="Country"
                size="medium"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid #000",
                    borderRadius: "4px",
                    marginBottom: 0,
                  },
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              </Box>

             
            </Container>

            <DialogActions sx={{ marginRight: "40px" }}>

            <Container sx={{display: 'flex', width: '100%',  justifyContent: 'space-between' }}>
              <Container>
              <Button
                color="primary"
                onClick={()=>{
                  handleDeleteClient(initialData.client_id);
                }}
                variant="outlined"
                sx={{
                  padding: "8px 25px",
                  borderColor: "#E05858FF",
                  color: "#E05858FF",
                }}
              >
                Delete
              </Button>
              </Container>


              <Container sx={{display: 'flex', justifyContent:'flex-end', gap: '20px'}}>
                
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
                onClick={handleCloseDialog}
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
                Update
              </Button>
              </Container>
              </Container>


            
            </DialogActions>
          </Dialog>
        </Container>
      </Container>
    </form>
  );
};

export default EditClient;
