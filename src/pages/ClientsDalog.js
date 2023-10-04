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
  Close as CloseIcon, // Import the CloseIcon from @mui/icons-material
} from "@mui/icons-material";
import MyDropdown from "../components/dropdown/DropDown";
import { addExpense } from "../state/redux/actions/expense/expenseActions";
import { fetchContacts } from "../state/redux/actions/contacts/fetch";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../components/firebase/firebase-config";

const ClientDialog = ({ openDialog, onClose, onClientSelect }) => {
  const clientz = useSelector((state) => state.clients.clients);
  console.log(clientz);
  console.log(openDialog);
  const [itemName, setItemName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [cost, setCost] = useState("");
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

  const statusOptions = ["Draft", "Active", "Sent", "Paid"];
  const [reimburse, setReimburse] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const user_id = user.userId;
  const budgets = useSelector((state) => state.budgets.budgets);

  

  const handleClos = () => {
    if (selectedImage) {
      const imageRef = storageRef(storage, `expenses/${selectedImage.name}`);
      console.log("Image selected");

      uploadBytes(imageRef, selectedImage)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              console.log("Image Uploaded Successfully");
              console.log(downloadURL);
              const newItem = {
                id: uuidv4(),
                name: itemName,
                description: description,
                reimburse: reimburse,
                job: job,
                cost: parseFloat(cost),
                userId: user_id,
                createdAt: new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
                status: status,
                createdBy: createdBy,
                receipt: downloadURL,
              };
              console.log(newItem);
              onClose(newItem);
              setItemName(""); // Reset name state
              setDescription(""); // Reset description state
              setJob(""); // Reset optionValue state
              // setUnitPrice(""); // Reset unitPrice state
              setCost(""); // Reset cost state
              setCreatedBy(""); // Reset cost state
              // setMarkup("");
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      const newItem = {
        id: uuidv4(),
        name: itemName,
        description: description,
        reimburse: reimburse,
        job: job,
        cost: parseFloat(cost),
        userId: user_id,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        status: status,
        createdBy: createdBy,
        receipt: "",
      };

      dispatch(addExpense(newItem));
      console.log(newItem);
      onClose(newItem);
      setItemName(""); // Reset name state
      setDescription(""); // Reset description state
      setJob(""); // Reset optionValue state
      // setUnitPrice(""); // Reset unitPrice state
      setCost(""); // Reset cost state
      setCreatedBy(""); // Reset cost state
      // setMarkup("");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
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
    setItemName(""); // Reset name state
    setDescription(""); // Reset description state
    setJob(""); // Reset optionValue state
    // setUnitPrice(""); // Reset unitPrice state
    setCost(""); // Reset cost state
    // setMarkup("");
  };
  
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState("");


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
    setItemName(""); // Reset name state
    setDescription(""); // Reset description state
    setJob(""); // Reset optionValue state
    // setUnitPrice(""); // Reset unitPrice state
    setCost(""); // Reset cost state
    // setMarkup("");
  };

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    // Initialize your expenses with sample data here
    setClients(clientz);
  }, [clientz]);

  useEffect(() => {
    // Filter expenses based on the search query
    const filteredClients = clients.filter((client) =>
      client.company_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredClients(filteredClients);
  }, [searchValue, clients]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  //

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
              Select or create a client
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
              <Typography variant="h6">
                Which client would you like to create this for?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Search"
                  variant="outlined"
                  fullWidth
                  value={searchValue}
                  onChange={handleSearchChange}
                  style={{ marginBottom: "16px", maxWidth: "30%" }}
                />
                <Typography variant="subtitle2">or</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleButtonClick}
                >
                  Create New Client
                </Button>
              </Box>

              <Stack
                sx={{
                  border: "1px solid #ccc",
                  height: "400px",
                  width: "100%",
                  padding: "10px",
                  marginTop: "16px",
                  overflowY: "scroll",
                }}
              >
                <div>
                  {/* Replace this section with your mapped data */}
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onClick={() => {
                        //fetch contacts
                        dispatch(fetchContacts(client.client_id)).then(()=>{
                          onClientSelect(client);

                        }).catch((error)=>{
                          console.error(error)
                        })
                        // Call the onClientSelect callback with the selected client data
                      }}
                    >
                      <div style={{ width: "20%" }}>
                        <Typography variant="subtitle1">
                          {client.company_name}
                        </Typography>
                        <Typography variant="body2">{client.email}</Typography>
                      </div>
                      <div style={{ width: "20%" }}>
                        <Typography variant="subtitle3">
                          {client.created_at}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle3">
                          {client.phone_number}
                        </Typography>
                      </div>
                      <div>
                        {/* Add your IconButton and Menu components here */}
                      </div>
                    </div>
                  ))}
                  {/* End of mapped data */}
                </div>
                {/* Display your data here */}
              </Stack>
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

export default ClientDialog;
