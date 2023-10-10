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
import { updateBudget } from "../state/redux/actions/budget/update";

const EditBudget = ({ openDialog, onClose, initialData }) => {
  const dispatch = useDispatch();

  const [projectTile, setProjectTile] = useState("");
  const [projectStatus, setProjectStatus]=useState("")
  const [internalNotes, setInternalNotes]=useState("")
  const [status, setStatus]=useState("")

 

  // console.log(initialData);
// 
  // console.log(initialData);
  const [selectedOption, setSelectedOption] = useState("");

  const budgetStatusOption = ["Draft", "Sent", "Active", "Archive"];

  useEffect(() => {
    if (initialData) {  
      setProjectTile(initialData.project_title || "");
      setProjectStatus(initialData.status || "");
      setInternalNotes(initialData.internal_notes || "");
     
    }
  }, [initialData]);

 

  const handleCloz = () => {
    const newItem = {
     budget_id: initialData.budget_id,
     project_title: projectTile,
     status: projectStatus,
     internal_notes: internalNotes
    };
    dispatch(updateBudget(initialData.budget_id,newItem))
    console.log(newItem)
    onClose(newItem);
    setProjectTile(""); // Reset name state
    setProjectStatus(""); // Reset description state
    setInternalNotes("");
   
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

  const handleOptionChange = (option) => {
    if(option==='Draft'){
      setSelectedOption('draft');
    setProjectStatus('draft')
    } else if(option==='Sent'){
      setSelectedOption('sent');
    setProjectStatus('sent')
    } else if(option==='Active'){
      setSelectedOption('active');
      setProjectStatus('active')
    } else {
      setSelectedOption('archived');
      setProjectStatus('archived')
    }
   
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
    setProjectTile(""); // Reset name state
    setProjectStatus(""); // Reset description state
    setInternalNotes("");
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
                placeholder="Project Title"
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
                value={projectTile}
                onChange={(e) => setProjectTile(e.target.value)}
              />

              <Typography variant="h5">Current Project Status</Typography>
              <Typography variant="h5">{initialData.status}</Typography>

              <Typography variant="h5">Change Project Status</Typography>
              <MyDropdown
                options={budgetStatusOption}
                value={initialData.status}
                onChange={handleOptionChange}
              />

              <Typography variant="h5">Internal Notes</Typography>

              <TextField
                id="filled-textarea"
                // label="Full Name"
                placeholder="Internal Notes"
                size="medium"
                multiline
                rows={4}
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
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
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
                  {/* <Button
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
                  </Button> */}
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

export default EditBudget;
