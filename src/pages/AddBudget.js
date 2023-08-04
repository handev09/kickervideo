import React, { useState } from "react";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import MyDropdown from "../components/dropdown/DropDown";
import ServiceDropDown from "../components/service-dropdown/Dropdown";
import RatingContainer from "../components/rating/Rating";
import UnitPriceCalculator from "../components/unit-price/UnitPrice";
import CreateNewLineItem from "./CreateNewLineItem";
import CustomDropdown from "../components/item-price-dropdown/DropDown";

const AddBudget = () => {
  const [dialogData, setDialogData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize with a default quantity of 1
  const [customDropdownUnitPrice, setCustomDropdownUnitPrice] = useState(0);

  const handleDialogData = (data) => {
    // setDialogData(data)

    if (data.name && data.description && data.optionValue) {
      setDialogData((prevData) => [...prevData, data]);
      console.log(data.name); // Full Name
      console.log(data.description); // Description
      console.log(data.optionValue);
    } 

    setIsDialogOpen(false);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };
  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  // States for Dialog
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleCustomDropdownPriceChange = (newPrice) => {
    setCustomDropdownUnitPrice(newPrice);
  };

  const initialOptions = [
    { name: "Option 1", price: 100 },
    { name: "Option 2", price: 200 },
    { name: "Option 3", price: 300 },
  ];
  const [options, setOptions] = useState(initialOptions);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };



  const handleAddService = (serviceData) => {
    if (serviceData.name && serviceData.price) {
      const newOption = {
        name: serviceData.name,
        price: parseFloat(serviceData.price), // Convert to a float number
      };
      setOptions((prevOptions) => [...prevOptions, newOption]);
      setIsDialogOpen(false);
    } else {
      setIsDialogOpen(false)
    }
  };



  const [selectedOption, setSelectedOption] = useState({
    cost: 0,
    markup: "",
  });

  const handleServiceOptionSelect = (price, cost, markup) => {
    setSelectedService({ price, cost, markup }); // Store the selected service's data
    setSelectedOption({ price, cost, markup });
  };

  const handleCostChange = (newCost) => {
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
              onAddNewOption={handleAddService}
              onSelectServiceOption={(price, cost, markup) => {
                handleServiceOptionSelect(price, cost, markup);
                setSelectedService({ price, cost, markup });
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
          <Typography variant="body1">$0.00</Typography>
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
          <Box
            sx={{
              marginBottom: "10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#666" }}>
              Drag and drop files or
            </Typography>
            <Box>
              <input type="file" style={{ display: "none" }} />
              <label htmlFor="file-upload">
                <Button variant="filled" type="text" color="primary">
                  Select a File
                </Button>
              </label>
            </Box>
          </Box>
        </Paper>
      </Container>
      {/* <Container  sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "150px",
          width: "100%",
          padding: "10px",
        }}>
          <Box>

          <Button variant="outlined">Cancel</Button>
          <Button variant="outlined">Save Draft</Button>
          <Button variant="outlined">Cancel</Button>
          </Box>
        </Container> */}

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
            onClick={handleClick}
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
