import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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
} from "@mui/material";
import {
  Close as CloseIcon, // Import the CloseIcon from @mui/icons-material
} from "@mui/icons-material";
import MyDropdown from "../components/dropdown/DropDown";
import { fetchItems } from "../state/redux/actions/items/fetch";
import { addItem } from "../state/redux/actions/items/create";
import { useDispatch, useSelector } from "react-redux";

const CreateNewLineItem = ({ openDialog, onClose, index }) => {
  console.log(index)
  const itemNum = index

  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const user_id = user.userId;
  
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [markup, setMarkup] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
 

  const dropdownOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];
  const [employmentType, setEmploymentType] = useState("");

  const handleClos = () => {
    console.log('itNum :'+itemNum)
    if(itemNum!==''){
      const newItem = {
        id: uuidv4(),
        name: fullName,
        description: description,
        optionValue: employmentType,
        unitPrice: parseFloat(unitPrice),
        cost: parseFloat(cost),
        markup: parseFloat(markup),
        quantity: 1,
        userId: user_id,
          createdAt: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          index:parseFloat(itemNum)
      }
      dispatch(addItem(newItem)).then(()=>{
        dispatch(fetchItems(user_id)).then(()=>{
          onClose(newItem);
          setFullName(""); // Reset name state
          setDescription(""); // Reset description state
          setEmploymentType(""); // Reset optionValue state
          setUnitPrice(""); // Reset unitPrice state
          setCost(""); // Reset cost state
          setMarkup("");
        }).catch((error)=>{
        console.error(error)
      })
      }).catch((error)=>{
        console.error(error)
      })
    } else{
      const newItem = {
        id: uuidv4(),
        name: fullName,
        description: description,
        optionValue: employmentType,
        unitPrice: parseFloat(unitPrice),
        cost: parseFloat(cost),
        markup: parseFloat(markup),
        quantity: 1,
        userId: user_id,
          createdAt: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
      }
      dispatch(addItem(newItem)).then(()=>{
        dispatch(fetchItems(user_id)).then(()=>{
          onClose(newItem);
          setFullName(""); // Reset name state
          setDescription(""); // Reset description state
          setEmploymentType(""); // Reset optionValue state
          setUnitPrice(""); // Reset unitPrice state
          setCost(""); // Reset cost state
          setMarkup("");
        }).catch((error)=>{
        console.error(error)
      })
      }).catch((error)=>{
        console.error(error)
      })
    }
    


   
  };

  const handleNormalClose = () => {
    const newItem = {
      id: "",
      name: "",
      description: "",
      optionValue: "",
      unitPrice: "",
      cost: "",
      markup: "",
      // Convert unitPrice to a float number
      // You can add other properties as needed
    };

    onClose(newItem);
    setFullName(""); // Reset name state
    setDescription(""); // Reset description state
    setEmploymentType(""); // Reset optionValue state
    setUnitPrice(""); // Reset unitPrice state
    setCost(""); // Reset cost state
    setMarkup("");
  };
  const handleCostChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid number (either an integer or a decimal)
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === "") {
      setCost(value);
    }
  };

  const handleMarkupChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid integer
    if (/^[0-9]*$/.test(value) || value === "") {
      setMarkup(value);
    }
  };

  // Calculate and update the unitPrice whenever cost or markup changes
  useEffect(() => {
    if (cost && markup) {
      const calculatedUnitPrice =
        parseFloat(cost) + parseFloat(cost) * (parseFloat(markup) / 100);
      setUnitPrice(calculatedUnitPrice.toFixed(2)); // Round to 2 decimal places
    } else {
      setUnitPrice("");
    }
  }, [cost, markup]);

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
              Create New Line Item
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
              <TextField
                id="filled-textarea"
                label="Full Name"
                placeholder="ex: Animation"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="Description"
                placeholder="input text"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="filled"
                rows={4}
                InputProps={{ disableUnderline: true }}
              />
            </Container>

            <Container sx={{ marginBottom: 5 }}>
              <MyDropdown
                options={dropdownOptions}
                onChange={(option) => setEmploymentType(option)}
              />
            </Container>

            <Container
              sx={{
                marginBottom: 8,
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                id="filled-textarea"
                label="Cost ($)"
                placeholder="0.00"
                type="number" // Set the input type to "number"
                inputProps={{ step: "0.01", min: "0" }}
                multiline
                sx={{
                  width: "30%",
                  "& .MuiFilledInput-root": {
                    marginBottom: 0,
                  },
                }}
                value={cost}
                onChange={handleCostChange}
                variant="filled"
                InputProps={{ disableUnderline: true }}
              />

              <TextField
                id="filled-textarea"
                label="Markup (%)"
                placeholder="0"
                multiline
                sx={{
                  width: "30%",
                  "& .MuiFilledInput-root": {
                    // Add the border style here for the filled variant
                    // Add border radius if you want rounded corners
                    marginBottom: 0,
                  },
                }}
                value={markup}
                onChange={handleMarkupChange}
                variant="filled"
                type="number"
                //   rows={4}
                InputProps={{ disableUnderline: true }}
              />





              <TextField
                id="filled-textarea"
                label="Unit Price ($)"
                placeholder="0.00"
                multiline
                sx={{
                  width: "30%",
                  "& .MuiFilledInput-root": {
                    marginBottom: 0,
                  },
                }}
                value={unitPrice}
                readOnly
                variant="filled"
                type="number"
                //   rows={4}
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

export default CreateNewLineItem;
