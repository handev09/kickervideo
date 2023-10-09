import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
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
import EditExpense from "./EditExpense";
import { fetchExpense } from "../state/redux/actions/expense/fetchExpense";
import LoadingSpinner from "./loadingSpinner";
import CreateClient from "./CreateClient";
import EditClient from "./EditClient";
import { fetchClients } from "../state/redux/actions/clients/fetch";
// import { Link, useNavigate } from "react-router-dom"; 

export default function ClientsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditClient, setIsEdiClient] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedClientData, setEditedClientData] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [clients, setClients]=useState([])
  const [sortedClients, setSortedClients]=useState([])
  const [sortedExpenses, setSortedExpenses] = useState([]);
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

  const clientz = useSelector((state) => state.clients.clients);
  console.log(clients);


  useEffect(() => {
    setClients(clientz);
    setSortedClients(clientz);
  }, [clientz]);

  const handleMenuOpen = (event, clientId) => {
    console.log(clientId);
    setAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
  };

  const handleEditClient = (clientId) => {
    const clientToEdit = clientz.find(
      (client) => client.client_id === clientId
    );
    setEditedClientData(clientToEdit);
    setIsEdiClient(true);
  };


  // const handleDialogData = (data) => {
  //   setIsLoading(true);
    
  //   console.log(data)

  //   if (data.companyName && data.companyEmail && data.phoneNumber) {
  //     if (data.isEditClientedData) {
  //       const updatedClients = clients.map((client) =>
  //         client.client_id === data.id
  //           ? { ...editedClientData, ...data }
  //           : client
  //       );
  //       console.log(updatedClients)
  //       setClients(updatedClients);
  //       setIsEdiClient(false);
  //     } else {
  //       setClients((prevClients) => [
  //         ...prevClients,
  //         {
  //           id: data.id,
  //           company_name: data.name,
  //           company_email: data.description,
  //           street1: data.street1,
  //           street2: data.street2,
  //           city: data.city,
  //           country: data.country,
  //           userId: data.user_id,
  //           createdAt: new Date().toLocaleDateString()
  //         },
  //       ]);
  //     }

  //     dispatch(fetchClients(parsedUser.userId)).then(()=>{
  //     }).catch((error)=>{
  //       setIsLoading(false)
  //       console.log(error);
  //     });
  //   }
  //   setIsDialogOpen(false);
  //   setIsLoading(false);
  //   setIsEdiClient(false);
  //   setEditedClientData(null);
  //   setAnchorEl(null);
  //   setSelectedClientId(null);
  // };


  const handleDialogData = (data) => {
    setIsLoading(true);
  
    console.log(data);
  
    if (data.companyName && data.companyEmail && data.phoneNumber) {
      if (data.isEditClientedData) {
        // Update existing client if it exists
        const updatedClients = clients.map((client) =>
          client.client_id === data.id ? { ...editedClientData, ...data } : client
        );
        setClients(updatedClients);
        setIsEdiClient(false);
      } else {
        // Check if the client already exists
        const existingClient = clients.find((client) => client.id === data.id);
  
        if (existingClient) {
          // Update the existing client
          const updatedClients = clients.map((client) =>
            client.client_id === data.id ? { ...client, ...data } : client
          );
          setClients(updatedClients);
        } else {
          // Add a new client if it doesn't exist
          setClients((prevClients) => [
            ...prevClients,
            {
              id: data.id,
              company_name: data.name,
              company_email: data.description,
              street1: data.street1,
              street2: data.street2,
              city: data.city,
              country: data.country,
              userId: data.user_id,
              createdAt: new Date().toLocaleDateString(),
            },
          ]);
        }
      }
  
      dispatch(fetchClients(parsedUser.userId))
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          // setIsLoading(false);
          console.log(error);
        });
    }
    setIsDialogOpen(false);
    setIsLoading(false);
    setIsEdiClient(false);
    setEditedClientData(null);
    setAnchorEl(null);
    setSelectedClientId(null);
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
 

  useEffect(() => {
    setClients(clientz)
    // Filter expenses based on the search query
    const searchedClients = clients.filter((client) =>
      client.company_name &&client.company_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSortedClients(searchedClients);
  }, [searchValue, clients]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(searchValue);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Clients | VBudget </title>
      </Helmet>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Clients
          </Typography>
          <CreateClient
            openDialog={isDialogOpen}
            onClose={handleDialogData}
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
            New Client
          </Button>
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap="40px">
          <Stack direction="column" sx={{ width: "78%", height: "100%" }}>
            <Stack direction="column" sx={{ width: "100%" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Badge
                  sx={{
                    border: "1px solid",
                    borderRadius: "5px",
                    padding: "5px 5px",
                    backgroundColor: "#ccc",
                    color: "#fff",
                  }}
                >
                  {sortedClients.length} Clients
                </Badge>
              </Stack>
              <Stack
                mb={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {/* <ExpensesSearch expenses={expensez} onSearch={setSearchQuery} />
                 */}
                <TextField
                  label="Search Clients..."
                  variant="outlined"
                  fullWidth
                  value={searchValue}
                  onChange={handleSearchChange}
                  style={{ marginTop: "20px", maxWidth: "30%" }}
                />
                {/* <Box sx={{ width: "30%" }}>
                  <Typography>Status</Typography>
                  <BlogPostsSort
                    options={statusSortOptions}
                    onSort={handleStatusSortChange}
                  />
                </Box> */}
                {/* <Box sx={{ width: "30%" }}>
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
                {sortedClients.map((client) => (
                  <div
                    key={client.id}
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
                      {/* <Typography variant="subtitle1">
                        {client.company_name}
                      </Typography>
                      <Typography variant="body2">
                        {client.company_email}
                      </Typography> */}
                       {/* Link to the client details page */}
                <Link to={`/dashboard/client-details/${client.client_id}`}> {/* Use the client's unique identifier */}
                  <Typography variant="subtitle1">
                    {client.company_name}
                  </Typography>
                  <Typography variant="body2">{client.company_email}</Typography>
                </Link>
                    </div>
                    <div
                      style={{
                        width: "20%",
                      }}
                    >
                      <Typography variant="subtitle3">
                        {client.created_at}
                      </Typography>
                    </div>
                    <div
                      style={
                        {
                          // width: '20%'
                        }
                      }
                    >
                      <Typography variant="subtitle3">
                        {client.country}
                      </Typography>
                    </div>
                    <div>
                      <IconButton
                        onClick={(event) =>
                          handleMenuOpen(event, client.client_id)
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
                            handleEditClient(selectedClientId);
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
      {editedClientData && (
  <EditClient
    openDialog={isEditClient}
    onClose={handleDialogData}
    initialData={editedClientData}
  />
)}
    </>
  );
}
