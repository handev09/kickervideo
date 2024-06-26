import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Grid,
  Button,
  Container,
  Stack,
  Box,
  Typography,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Iconify from "../components/iconify";
import { useSelector } from "react-redux";
import { BlogPostsSort, ExpensesSearch } from "../sections/@dashboard/expenses";
// import POSTS from "../_mock/blog";
import CreateNewExpense from "./createExpense";
// import EditExpense from "./EditExpense";
import { fetchExpense } from "../state/redux/actions/expense/fetchExpense";
import LoadingSpinner from "./loadingSpinner";
import CreateContact from "./CreateContact";
import EditContact from "./EditContact";
import { fetchContacts } from "../state/redux/actions/contacts/fetch";

export default function ClientDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clientId } = useParams(); // Get the client's unique identifier from the URL
  const [clientDetails, setClientDetails] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [sortedClients, setSortedClients] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedContactData, setEditedContactData] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [sortedContacts, setSortedContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const storedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(storedUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/login";
    } else {
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);
      const id = parsedUser.userId;
      dispatch(fetchExpense(id));
    }
  }, [dispatch, navigate]);

  
  const [searchValue, setSearchValue] = useState("");

  const expensez = useSelector((state) => state.expenses.expenses);
  console.log(expensez);

  const contactz = useSelector((state) => state.contacts.contacts);
  console.log(contactz);

  useEffect(() => {
    setSortedClients(clientDetails);
    // setSortedExpenses(expensez);
  }, [clientDetails]);

  const handleMenuOpen = (event, contactId) => {
    console.log(contactId);
    setAnchorEl(event.currentTarget);
    setSelectedContactId(contactId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContactId(null);
  };

  // useEffect(()=>{
  //   setContacts(contactz)
  // },[contactz])

  const handleEditContact = (contactId) => {
    console.log(contactId)
    const contactToEdit = contacts.find(
      (contact) => contact.contact_id === contactId
    );
    console.log(contactToEdit)
    setEditedContactData(contactToEdit);
    setIsEditContact(true);
  };

  const uniqueStatusValues = [
    ...new Set(expensez.map((expense) => expense.status)),
  ];

  const statusSortOptions = uniqueStatusValues.map((status) => ({
    value: status,
    label: status,
  }));

  const uniqueEnteredByVlaues = [
    ...new Set(expensez.map((expense) => expense.createdBy)),
  ];

  const enteredByOptions = uniqueEnteredByVlaues.map((enteredBy) => ({
    value: enteredBy,
    label: enteredBy,
  }));

  // 

 

  const handleDialogData = (data) => {
    setIsLoading(true);

    if (data.name && data.description && data.reimburse) {
      if (editedContactData) {
        const updatedContacts = contacts.map((contact) =>
          contact.contact_id === editedContactData.id
            ? { ...editedContactData, ...data }
            : contact
        );
        setContacts(updatedContacts);
        setIsEditContact(false);
      } else {
        setExpenses((prevExpenses) => [
          ...prevExpenses,
          {
            id: data.id,
            name: data.name,
            description: data.description,
            optionValue: data.optionValue,
            createdAt: new Date().toLocaleDateString(),
            total: data.cost,
          },
        ]);
      }
    }
    dispatch(fetchContacts(parsedUser.userId))
      .then(() => {
        // Fetching is complete, set isLoading back to false
        console.log("set expenses data here");
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here, and also set isLoading back to false
        console.error("Error fetching expenses:", error);
        setIsLoading(false);
      });

    setIsDialogOpen(false);
    setIsEditContact(false);
    setEditedContactData(null);
    setAnchorEl(null);
    setSelectedContactId(null);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenses);
  };
  // Filter expenses based on the search query
  const filteredExpenses = expenses.filter((expense) =>
    expense.expense_name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  useEffect(() => {
    // Filter expenses based on the search query
    const searchedExpenses = contacts.filter((contact) =>
      contact.contact_name?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSortedContacts(searchedExpenses);
  }, [searchValue, contacts]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(searchValue);

  // Replace this with actual client data fetching logic using the clientId
  useEffect(() => {
    // Fetch client details based on clientId (e.g., from an API or local data)
    const fetchClientDetails = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch(
          `https://kickervideoapi.vercel.app/api/v1/clients/client-details?clientId=${clientId}`
        );
        const data = await response.json();
        setClientDetails(data[0]);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    const fetchClientContacts = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch(
          `https://kickervideoapi.vercel.app/api/v1/contacts/fetch?companyId=${clientId}`
        );
        const data = await response.json();
        setContacts(data);
        setSortedContacts(data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchClientDetails();
    fetchClientContacts();
  }, [clientId]);

  if (!clientDetails) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>ClientDetails | VBudget </title>
      </Helmet>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Client Details
          </Typography>
          <CreateContact
            openDialog={isDialogOpen}
            onClose={handleDialogData}
            comName={clientDetails.company_name}
            comId={clientDetails.client_id}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E05858FF",
              transition: "opacity 0.3s ease-in-out",
              "&:hover": {
                opacity: 0.8,
                backgroundColor: "#E05858FF",
              },
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleDialogOpen}
          >
            New Contact
          </Button>
        </Stack>

        {/* Company details here */}

        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "20px",
            //   maxWidth: '800px',
            marginBottom: "20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Full name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {clientDetails.company_name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Company Email
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {clientDetails.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Phone Number
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {clientDetails.phone_number}
            </Typography>
          </Box>
        </Stack>

        {/* Comapny Address here */}
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Company Address
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "20px",
            //   maxWidth: '800px',
            marginBottom: "20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Street
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {clientDetails.street_1}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Address Line2
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {clientDetails.street_2}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              City
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {clientDetails.city}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Zip
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {clientDetails.zip}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Country
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {clientDetails.country}
            </Typography>
          </Box>
        </Stack>

        {/* Other Contacts */}
        <Typography variant="h4" gutterBottom>
          Company Contacts
        </Typography>

        <Stack direction="row" justifyContent="space-between" gap="40px">
          <Stack direction="column" sx={{ width: "78%", height: "100%" }}>
            <Stack direction="column" sx={{ width: "100%" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              ></Stack>
              <Stack
                mb={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {/* <ExpensesSearch expenses={expensez} onSearch={setSearchQuery} />
                 */}
                <TextField
                  label="Search Contacts..."
                  variant="outlined"
                  fullWidth
                  value={searchValue}
                  onChange={handleSearchChange}
                  style={{ marginTop: "20px", maxWidth: "30%" }}
                />

                <Badge
                  sx={{
                    border: "1px solid",
                    borderRadius: "5px",
                    padding: "5px 5px",
                    backgroundColor: "#ccc",
                    color: "#fff",
                  }}
                >
                  {sortedContacts.length} Contacts
                </Badge>
                {/* <Box sx={{ width: "30%" }}>
                  <Typography>Status</Typography>
                  <BlogPostsSort
                    options={statusSortOptions}
                    onSort={handleStatusSortChange}
                  />
                </Box>
                <Box sx={{ width: "30%" }}>
                  <Typography>Entered By</Typography>

                  <BlogPostsSort
                    options={enteredByOptions}
                    onSort={handleEnteredBySortChange}
                  />
                </Box> */}
              </Stack>
              <Stack
                sx={{
                  border: "1px solid #ccc",
                  height: "600px",
                  width: "100%",
                  padding: "10px",
                }}
              >
                {sortedContacts.map((contact) => (
                  <div
                    key={contact.contact_id}
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "20%",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {contact.contact_name}
                      </Typography>
                      <Typography variant="body2">
                        {contact.phone_number}
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "20%",
                      }}
                    >
                      <Typography variant="subtitle3">
                        {contact.company_name}
                      </Typography>
                    </div>
                    <div
                      style={
                        {
                          width: '20%'
                        }
                      }
                    >
                      

                      <Typography variant="subtitle3">
                        {contact.created_at}
                      </Typography>
                    </div>

                    {/* Primary Contact Badge */}
                    <div
                      style={
                        {
                          // width: '20%'
                        }
                      }
                    >
                      
                      {contact.isPrimary&&<Button variant="filled" sx={{backgroundColor:'#E05858FF',color:'#fff',transition: "opacity 0.3s ease-in-out", // Adding a transition for smooth effect
              "&:hover": {
                opacity: 0.8, // Adjust the opacity value as needed
                backgroundColor: "#E05858FF",
              }}}>Primary</Button>}

              {!contact.isPrimary&&
              <Button variant='filled' sx={{color:'#fff',backgroundColor:'#fff'}}>Primary</Button>
              
              }

                     
                    </div>
                    <div>
                      <IconButton
                        onClick={(event) =>
                          handleMenuOpen(event, contact.contact_id)
                        }
                      >
                        <MoreVertIcon />   
                      </IconButton>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem
                          onClick={() => {
                            handleEditContact(selectedContactId);
                          }}
                        >
                          Edit
                        </MenuItem>
                        {/* <MenuItem
                          onClick={() => handleDeleteExpense(selectedExpenseId)}
                        >
                          Delete
                        </MenuItem> */}
                      </Menu>
                    </div>
                  </div>
                ))}
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="column" sx={{ width: "20%", height: "100%" }}>
            <Typography variant="h4">Help and documentation</Typography>
            <Typography variant="p">
              You can quickly and easily generate highly customizable reports
              from the
            </Typography>
            <Typography>Expenses Report</Typography>
          </Stack>
        </Stack>
      </Box>
      <EditContact
        openDialog={isEditContact}
        onClose={handleDialogData}
        initialData={editedContactData}
        comName={clientDetails.company_name}
        comId={clientDetails.client_id}
      />
    </>
  );
}
