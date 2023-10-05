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
  Box,
} from "@mui/material";
import {
  Close as CloseIcon, // Import the CloseIcon from @mui/icons-material
} from "@mui/icons-material";
import MyDropdown from "../components/dropdown/DropDown";

import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../state/redux/actions/expense/deleteExpense"; // Update the import path to match your project structure
import MyExpensesDropdown from "../components/dropdown-expenses/DropDown";
import MyReimburseDropdown from "../components/dropdown-reimburse/DropDown";

const EditBudget = ({ openDialog, onClose, initialData }) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const budgets = useSelector((state) => state.budgets.budgets);

  console.log(initialData);

  const dropdownOptions = budgets.map((budget) => budget.budget_name);
  const dropdownOptionNames = budgets.map((budget) => budget.client_name);
  const [employmentType, setEmploymentType] = useState("");
  const [reimburse, setReimburse] = useState("");
  const [reimburseOptions, setReimburseOptions] = useState("");
  const dropdownJobs = budgets.map((budget) => budget);
  console.log(initialData);

  useEffect(() => {
    if (initialData) {
      setItemName(initialData.expense_name || "");
      setDescription(initialData.description || "");
      setCost(initialData.cost || "");
      setEmploymentType(initialData.optionValue || "");
    }
  }, [initialData]);

  useEffect(() => {
    setReimburseOptions(employmentType.company_client);
  }, [employmentType]);
  console.log(reimburseOptions);

  const handleCloz = () => {
    const newItem = {
      id: uuidv4(),
      name: itemName,
      description: description,
      optionValue: employmentType,
      //   unitPrice: parseFloat(unitPrice),
      cost: parseFloat(cost),
      //   markup: parseFloat(markup),
      quantity: 1,
      // Convert unitPrice to a float number
      // You can add other properties as needed
    };
    onClose(newItem);
    setItemName(""); // Reset name state
    setDescription(""); // Reset description state
    setEmploymentType("");
    setCost("");
  };

  const handleDeleteExpense = (expenseId) => {
    console.log(expenseId);
    dispatch(deleteExpense(expenseId));
    const newItem = {
      id: "",
      name: "",
      description: "",
      optionValue: "",
      cost: "",
    };
    onClose(newItem);
  };

  const handleNormalClose = () => {
    const newItem = {
      id: "",
      name: "",
      description: "",
      optionValue: "",
      cost: "",
    };

    onClose(newItem);
    setItemName(""); // Reset name state
    setDescription(""); // Reset description state
    setEmploymentType("");
    setCost(""); // Reset cost state
    // setMarkup("");
  };
  const handleCostChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid number (either an integer or a decimal)
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === "") {
      setCost(value);
    }
  };

  //   const handleMarkupChange = (e) => {
  //     const value = e.target.value;
  //     // Validate that the input is a valid integer
  //     if (/^[0-9]*$/.test(value) || value === "") {
  //       setMarkup(value);
  //     }
  //   };

  // Calculate and update the unitPrice whenever cost or markup changes
  //   useEffect(() => {
  //     if (cost && markup) {
  //       const calculatedUnitPrice =
  //         parseFloat(cost) + parseFloat(cost) * (parseFloat(markup) / 100);
  //       setUnitPrice(calculatedUnitPrice.toFixed(2)); // Round to 2 decimal places
  //     } else {
  //       setUnitPrice("");
  //     }
  //   }, [cost, markup]);

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
                minHeight: "70vh", // Set the maximum height of the content area
              },
            }}
          >
            <DialogTitle
              variant="h4"
              sx={{ backgroundColor: "#F3F4F6FF", marginBottom: 5 }}
            >
              Edit Budget
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
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
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

            <Container
              sx={{
                marginBottom: 5,
                // position: "relative",
                zIndex: 2,
                display: "flex",
                // width: '100%',
                // backgroundColor:'#000',
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  // position: "relative",
                  zIndex: 2,
                  width: "40%",
                  // justifyContent: "space-between",
                }}
              >
                <Typography>Job</Typography>
                <MyExpensesDropdown
                  options={dropdownJobs}
                  onChange={(option) => {
                    setEmploymentType(option);
                    console.log(employmentType);
                  }}
                />
              </Box>
              <Box
                sx={{
                  // position: "relative",
                  zIndex: 2,
                  width: "40%",
                  // justifyContent: "space-between",
                }}
              >
                <Typography>Reimburse to</Typography>
                <MyReimburseDropdown
                  option={reimburseOptions}
                  onChange={(option) => {
                    setReimburse(option);
                  }}
                />
              </Box>
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
            </Container>

            <DialogActions sx={{ marginRight: "40px", display: "flex" }}>
              <Container
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Container>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleDeleteExpense(initialData.expense_id);
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

                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "20px",
                  }}
                >
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
                    onClick={() => {
                      handleCloz();
                    }}
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
                </Container>
              </Container>
            </DialogActions>
          </Dialog>
        </Container>
      </Container>
    </form>
  );
};

export default EditBudget;
