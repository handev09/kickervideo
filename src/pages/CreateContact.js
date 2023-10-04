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
import { addContact } from "../state/redux/actions/contacts/create";
import { fetchClients } from "../state/redux/actions/clients/fetch";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../components/firebase/firebase-config";


const CreateContact = ({ openDialog, onClose, comName,comId }) => {
  console.log(comName);
  console.log(comId);
  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");


  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const user_id = user.userId;

  const handleClos = () => {
    const newItem = {
      id: uuidv4(),
      contactName: contactName,
      contactEmail: contactEmail,
      phoneNumber: phoneNumber,
      companyName: comName,
      userId: user_id,
      companyId: comId,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      role: contactRole
    };

    dispatch(addContact(newItem))
      .then(() => {
        dispatch(fetchClients(user_id));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(newItem);
    onClose(newItem);
    setContactName("");
    setContactEmail("");
    setPhoneNumber("");
    setContactRole("");
    
  };

  const handleNormalClose = () => {
    const newItem = {
      id: "",
      name: "",
      description: "",
      optionValue: "",
      cost: "",
      userId: "",
    };
    console.log(newItem);

    onClose(newItem);
    setContactName("");
    setContactEmail("");
    setPhoneNumber("");
    setContactRole("");
    
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
                paddingBottom: "30px", // Set the maximum height of the content area
              },
            }}
          >
            <DialogTitle
              variant="h4"
              sx={{ backgroundColor: "#F3F4F6FF", marginBottom: 5 }}
            >
              Create a New Contact
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
                value={contactName}
                onChange={(e) => {
                  setContactName(e.target.value);
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
                value={contactEmail}
                onChange={(e) => {
                  setContactEmail(e.target.value);
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
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
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
                value={contactRole}
                onChange={(e) => {
                  setContactRole(e.target.value);
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

export default CreateContact;
