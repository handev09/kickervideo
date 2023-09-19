import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Container,
  Button,
  TextField,
  Box,
  Paper,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Close as CloseIcon, Label } from "@mui/icons-material";
import {
  Save as SaveIcon,
  Description as PdfIcon,
  Send as SendIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import ServiceDropDown from "../components/service-dropdown/Dropdown";
import RatingContainer from "../components/rating/Rating";
import CreateNewLineItem from "./CreateNewLineItem";
import CustomDropdown from "../components/item-price-dropdown/DropDown";
import {fetchUserBudgets} from '../state/redux/actions/budget/updateUserBudgetsAction'

import { useDispatch,useSelector } from "react-redux";
import { addBudget } from "../state/redux/actions/budget/budgetActions";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../components/firebase/firebase-config";

const AddBudget = () => {
  const storedUser = localStorage.getItem('user');
  console.log(storedUser);
  const user = useSelector(state => state.login.user);
  console.log(user.userId);
  const user_id = user.userId;
  const [dialogData, setDialogData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize with a default quantity of 1
  const [customDropdownUnitPrice, setCustomDropdownUnitPrice] = useState(0);
  const [budgetSubTotal, setBudgetSubTotal] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notes, setNotes] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);

  // States for Dialog
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: {
      cost: "",
      markup: "",
      unitPrice: "",
    },
    crew: "",
  });

  const navigate = useNavigate();
  // const [budget, setBudget] = useState('');
  const dispatch = useDispatch();
  const [budgetData, setBudgetData] = useState({
    client: "",
    projectTitle: "",
    services: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    internalNotes: "",
    attachments: [],
    createdAt: "",
    userId: "",
    budgetId: uuidv4(),
    status: "awaitingresponse",
  });
  const handleAddBudget = () => {

    // Create the budget object
    console.log(budgetData.client);
    // Logic for budget & image Upload
    if (selectedImage) {
      console.log('Image Selected')
      const storageRef = ref(storage, `budgets/${selectedImage.name}`);
    
      // Upload the selected image
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => {
          // File uploaded successfully, get the download URL
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              // Use the downloadURL as needed, for example, you can save it to your database
              console.log("Download URL:", downloadURL);
    
              // Your code to use the downloadURL
              // ...
              const newBudget = {
                client: budgetData.client,
                projectTitle: budgetData.projectTitle,
                services: budgetData.services,
                subtotal: budgetData.subtotal,
                discount: budgetData.discount,
                tax: budgetData.tax,
                total: budgetData.total,
                internalNotes: budgetData.internalNotes,
                // attachments: budgetData.attachments,
                createdAt: new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
                userId: user_id,
                budgetId: budgetData.budgetId,
                status: budgetData.status,
                attachmentsUrl: downloadURL
          
              };
              console.log(newBudget)
          
              // Dispatch the new budget tothe Redux store
              dispatch(addBudget(newBudget));
              dispatch(fetchUserBudgets(user_id));
          
              //Navigate to Home Page
              // navigate("/");
    
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              // Handle the error appropriately
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          // Handle the error appropriately
        });
    } else {
      console.error("No selected image to upload.");
      // Handle the case where no image is selected
      const newBudget = {
        client: budgetData.client,
        projectTitle: budgetData.projectTitle,
        services: budgetData.services,
        subtotal: budgetData.subtotal,
        discount: budgetData.discount,
        tax: budgetData.tax,
        total: budgetData.total,
        internalNotes: budgetData.internalNotes,
        // attachments: budgetData.attachments,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        userId: user_id,
        budgetId: budgetData.budgetId,
        status: budgetData.status,
  
      };
      console.log(newBudget)
  
      // Dispatch the new budget tothe Redux store
      dispatch(addBudget(newBudget));
      dispatch(fetchUserBudgets(user_id));
  
      //Navigate to Home Page
      navigate("/");
    }
    
  };

  const handleDialogData = (data) => {
    // setDialogData(data)

    if (data.name && data.description && data.optionValue) {
      setDialogData((prevData) => [...prevData, data]);
      console.log(data.name); // Full Name
      console.log(data.description); // Description
      console.log(data.optionValue);

      // Update the services array in budgetData
      setBudgetData((prevBudgetData) => ({
        ...prevBudgetData,
        services: [...prevBudgetData.services, data],
      }));
    }

    setIsDialogOpen(false);
  };

  const handleNotes = (e) => {
    setNotes(e.target.value);
    setBudgetData((prevBudgetData) => ({
      ...prevBudgetData,
      internalNotes: e.target.value,
    }));
  };

  //follow up for case where service options reset to default values when the selected option is changed

  useEffect(() => {
    const subtotal = dialogData.reduce((sum, item) => sum + item.unitPrice, 0);
    setBudgetSubTotal(subtotal);
    setCustomDropdownUnitPrice(customDropdownUnitPrice);
  }, [dialogData]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };
  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    const index = dialogData.findIndex((item) => item.id === selectedOption.id);
    if (dialogData[index].id == selectedOption.id) {
      dialogData[index].quantity = newQuantity;
    } else {
      console.log("error");
    }
    console.log(dialogData[index]);
  };

  useEffect(() => {
    const subtotal = dialogData.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    setBudgetSubTotal(subtotal);
    setBudgetData((prevBudgetData) => ({
      ...prevBudgetData,
      subtotal: subtotal,
      total: subtotal,
    }));
  }, [dialogData]);

  const handleCustomDropdownPriceChange = (id, newPrice) => {
    setCustomDropdownUnitPrice(newPrice);
    // const index = dialogData.findIndex(item => item.id === id);
    //   setDialogData((prevData)=>[...prevData, dialogData[index].unitPrice = newPrice])

    const updatedDialogData = dialogData.map((item) => {
      if (item.id === id) {
        return { ...item, unitPrice: customDropdownUnitPrice };
      }
      return item;
    });

    // Update the state with the new dialogData
    setDialogData(updatedDialogData);
  };

  const [options, setOptions] = useState([]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const [selectedOption, setSelectedOption] = useState({
    price: 0,
    cost: 0,
    markup: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  //have to handle option showing error screen at first select***

  const handleServiceOptionSelect = (id, unitPrice, cost, markup) => {
    setSelectedService({ id, unitPrice, cost, markup }); // Store the selected service's data
    // console.log(selectedService.unitPrice);
    setSelectedOption({ id, unitPrice, cost, markup });
    console.log(selectedOption.id);
    // console.log(`Dropdown act: ${selectedOption.unitPrice}`);
    setQuantity(1);
  };

  const handleCostChange = (id, newCost) => {
    const index = dialogData.findIndex((item) => item.id === id);
    dialogData[index].cost = newCost;

    setNewService((prevService) => ({
      ...prevService,
      price: newCost,
    }));
  };

  const handleMarkupChange = (newMarkup) => {
    setNewService((prevService) => ({
      ...prevService,
      markup: newMarkup,
    }));
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    console.log(selectedFiles)
  
    // Update the budgetData with the new attachments
    setBudgetData((prevBudgetData) => ({
      ...prevBudgetData,
      attachments: [...prevBudgetData.attachments, ...files],
    }));
  };
  
  
  return (
    <form>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ marginLeft: 3 }}>
          New Budget
        </Typography>
      </Box>

      {/* Input Boxes */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginBottom: "40px",
          mt: 7,
        }}
      >
        {/* ... Textfields Container ... */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginLeft: 0,
          }}
        >
          <Typography variant="h5">Client</Typography>
          <TextField
            id="filled-textarea"
            size="medium"
            placeholder="Select +"
            multiline
            sx={{
              width: "100%",
              // py: 20,
              "& .MuiFilledInput-root": {
                border: "1px solid #000",
                borderRadius: "4px",
                marginBottom: 30,
              },
            }}
            variant="outlined"
            InputProps={{ disableUnderline: true }}
            value={budgetData.client}
            onChange={(e) =>
              setBudgetData({ ...budgetData, client: e.target.value })
            }
          />

          <Box sx={{ marginLeft: 0, marginTop: 2 }}>
            <Typography variant="h5">Project Title</Typography>
            <TextField
              id="filled-textarea"
              // label="Full Name"
              placeholder="Title"
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
              value={budgetData.projectTitle}
              onChange={(e) =>
                setBudgetData({ ...budgetData, projectTitle: e.target.value })
              }
            />
          </Box>
        </Box>

        <Container>
          <Typography
            variant="p"
            gutterBottom
            sx={{ marginLeft: 3, marginBottom: 10 }}
          >
            Budget details
          </Typography>

          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography variant="p" gutterBottom>
              Budget number
            </Typography>

            <Typography variant="p" gutterBottom>
              #2
            </Typography>

            <Typography variant="p" gutterBottom sx={{ color: "#E05858FF" }}>
              Change
            </Typography>
          </Container>

          {/* ... Rating container ... */}
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Typography variant="p" gutterBottom sx={{ width: "100%" }}>
              Rate opportunity
            </Typography>

            <Container>
              <RatingContainer />
            </Container>
          </Container>

          {/* ... Button for the add custom field ... */}

          <Container sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ borderColor: "#E05858FF", color: "#E05858FF" }}
            >
              Add Custom Field
            </Button>
          </Container>
        </Container>
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          gap: "40px",
        }}
      >
        <Box>
          <Typography variant="p" gutterBottom>
            PRODUCT/SERVICE
          </Typography>
          <Box sx={{ mt: 1 }}>
            <ServiceDropDown
              dialogData={dialogData}
              // onAddNewOption={handleAddService}
              //come back and tract ui chnages when the selected option is changed
              //so that we update the values on the ui ***
              onSelectServiceOption={(id, unitPrice, cost, markup) => {
                handleServiceOptionSelect(id, unitPrice, cost, markup);
                console.log(id, unitPrice, cost, markup);
                setSelectedService({ id, unitPrice, cost, markup });
              }}
            />
          </Box>

          <Button
            variant="filled"
            sx={{ backgroundColor: "#E05858FF", color: "#fff", mt: 2 }}
            onClick={handleDialogOpen}
          >
            + Add
          </Button>

          {/* ... Dialog stuff ... */}

          <CreateNewLineItem
            openDialog={isDialogOpen}
            onClose={handleDialogData}
          />
        </Box>

        <Container sx={{ display: "flex", gap: "40px" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="p" gutterBottom>
              QTY
            </Typography>
            <TextField
              type="number"
              value={quantity}
              size="small"
              onChange={handleQuantityChange}
              variant="outlined"
              style={{}}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="p" gutterBottom>
              ITEM PRICE
            </Typography>
            <CustomDropdown
              selectedServiceCost={selectedOption.cost} // Pass the selected option's cost
              selectedServiceMarkup={selectedOption.markup} // Pass the selected option's markup
              onCostChange={handleCostChange} // Handle cost change
              onMarkupChange={handleMarkupChange}
              selectServiceId={selectedOption.id}
              onUnitPriceChange={handleCustomDropdownPriceChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="p" gutterBottom>
              TOTAL
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              sx={{ width: "100%", textAlign: "center" }}
              value={
                !isNaN(customDropdownUnitPrice) && !isNaN(quantity)
                  ? (quantity * customDropdownUnitPrice).toFixed(2)
                  : ""
              }
              readOnly
            />
          </Box>
        </Container>
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "150px",
          width: "100%",
          padding: "10px",
        }}
      >
        {/* Left Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">Discount</Typography>
          <Typography
            variant="body1"
            sx={{
              border: "1px solid #000",
              textAlign: "center",
              padding: "3px 2px",
              borderRadius: "5px",
            }}
          >
            Tax
          </Typography>
          <Typography variant="body1">Total</Typography>
        </Box>

        {/* Right Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Typography variant="body1">{`$${budgetSubTotal}`}</Typography>
          <Button variant="text" fullWidth>
            Add Discount
          </Button>
          <Button variant="outlined" fullWidth>
            Add Tax
          </Button>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            $0.00
          </Typography>
        </Box>
      </Container>

      <Container sx={{ padding: "20px", mt: 20 }}>
        <Typography variant="h3" sx={{ marginBottom: "10px" }}>
          Internal notes & attachments @
        </Typography>

        {/* Internal Notes */}
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            id="note-details"
            multiline
            placeholder="Note details"
            rows={4}
            fullWidth
            variant="outlined"
            value={budgetData.internalNotes}
            onChange={handleNotes}
          />
        </Box>

        {/* File Upload Section */}
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
           <Container
              // justifyContent="center"
              // alignItems="center"
              // flexDirection="column"
              sx={{ marginTop: "0", marginBottom: "50px" }}
            >
              {/* <Typography variant="p" sx={{ marginBottom: "30px", marginRight: '20px' }}>
                Receipt
              </Typography> */}

              
            </Container>
          <Box
            sx={{
              marginBottom: "10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              // eslint-disable-next-line no-dupe-keys
              // textAlign: "center",
              // justifyContent: "center",
            }}
          >
            <div style={{width: '100%'}}>
              <Paper
                // className={classes.dropArea}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#E05858FF",
                  color: "#fff",
                  borderRadius: "3px",
                  width: '80%'
                }}
              >
                Upload Files
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    display: "none",
                  }}
                  ref={imageInputRef}
                />
              </Button>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
                {/* </label> */}
                <p>or</p>
                <p>Drag and drop files here</p>
              </Paper>
              <ul>
                {selectedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          </Box>
        </Paper>
      </Container>

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
          <Button variant="outlined">Cancel</Button>
          <Button variant="outlined">Save Draft</Button>
          <Button
            aria-describedby={id}
            sx={{
              backgroundColor: "#E05858FF",
              color: "#fff",
              borderRadius: "3px",
            }}
            variant="filled"
            endIcon={<ExpandMoreIcon />}
            // onClick={handleClick}
            onClick={handleAddBudget}
          >
            Save And...
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PdfIcon />
                </ListItemIcon>
                <ListItemText primary="Save PDF" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Send to Google Sheets" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <div>{/* Custom icon or component */}</div>
                </ListItemIcon>
                <ListItemText primary="Convert to Active" />
              </ListItem>
            </List>
          </Popover>
        </Box>
      </Container>
    </form>
  );
};

export default AddBudget;
