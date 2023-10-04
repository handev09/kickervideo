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
} from "@mui/material";
import {
  Close as CloseIcon, // Import the CloseIcon from @mui/icons-material
} from "@mui/icons-material";
import MyExpensesDropdown from "../components/dropdown-expenses/DropDown";
import MyDropdown from "../components/dropdown/DropDown";
import { addExpense } from "../state/redux/actions/expense/expenseActions";
import { fetchExpense } from "../state/redux/actions/expense/fetchExpense";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../components/firebase/firebase-config";
import MyReimburseDropdown from "../components/dropdown-reimburse/DropDown";

const CreateNewExpense = ({ openDialog, onClose }) => {
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
  // const [rei]
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

  const dropdownJobs = budgets.map((budget) => budget);
  const [reimburseOptions, setReimburseOptions] = useState("");

  useEffect(()=>{
    setReimburseOptions(employmentType.company_client)
  }, [employmentType])
  console.log(reimburseOptions)

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

              dispatch(addExpense(newItem));
              dispatch(fetchExpense(user_id));
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
  const handleCostChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid number (either an integer or a decimal)
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === "") {
      setCost(value);
    }
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
              Create New Expense
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
                label="Expense Name"
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
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
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

            <Container
              sx={{
                marginBottom: 4,
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                id="filled-textarea"
                label="Total ($)"
                placeholder="0.00"
                type="number" // Set the input type to "number"
                inputProps={{ step: "0.01", min: "0" }}
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    marginBottom: 0,
                  },
                }}
                value={cost}
                onChange={handleCostChange}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
              />
            </Container>

            {/* Select fields */}

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
              <Box sx={{
                // position: "relative",
                zIndex: 2,
                width: '40%',
                // justifyContent: "space-between",
              }}>
                <Typography>Job</Typography>
                <MyExpensesDropdown
                  options={dropdownJobs}
                  onChange={(option) => {
                    setEmploymentType(option);
                    console.log(employmentType);
                  }}
                />
              </Box>
              <Box sx={{
                // position: "relative",
                zIndex: 2,
                width: '40%',
                // justifyContent: "space-between",
              }}>
                <Typography>Reimburse to</Typography>
                <MyReimburseDropdown
                  option={reimburseOptions}
                  onChange={(option) => {
                    setReimburse(option)
                  }}
                />
              </Box>

              
            </Container>

            <Container
              sx={{
                marginBottom: 4,
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                id="filled-textarea"
                label="Created By"
                placeholder="ex: Team Member"
                multiline
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    border: "1px solid transparent", // Add the border style here for the filled variant
                    borderRadius: "4px", // Add border radius if you want rounded corners
                    marginBottom: 3,
                  },
                }}
                value={createdBy}
                onChange={(e) => {
                  setCreatedBy(e.target.value);
                }}
                variant="outlined"
                InputProps={{ disableUnderline: true }}
              />
            </Container>

            <Container
              // justifyContent="center"
              // alignItems="center"
              // flexDirection="column"
              sx={{ marginTop: "0", marginBottom: "50px" }}
            >
              <Typography
                variant="p"
                sx={{ marginBottom: "30px", marginRight: "20px" }}
              >
                Receipt
              </Typography>

              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#E05858FF",
                  color: "#fff",
                  borderRadius: "3px",
                  maxWidth: "20%",
                }}
              >
                Upload Receipt
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
            </Container>
            <Container>
              <Box sx={{
                // position: "relative",
                width: '50%',
                // justifyContent: "space-between",
              }}>
                <Typography>Expense Status</Typography>
                <MyDropdown
                  options={statusOptions}
                  onChange={(option) => setStatus(option)}
                />
              </Box>
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

export default CreateNewExpense;
