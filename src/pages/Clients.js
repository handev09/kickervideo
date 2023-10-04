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
// import { Link, useNavigate } from "react-router-dom"; 

export default function ClientsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditExpense, setIsEditExpense] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedExpenseData, setEditedExpenseData] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
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

  const handleMenuOpen = (event, expenseId) => {
    console.log(expenseId);
    setAnchorEl(event.currentTarget);
    setSelectedExpenseId(expenseId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedExpenseId(null);
  };

  const handleEditExpense = (expenseId) => {
    const expenseToEdit = expensez.find(
      (expense) => expense.expense_id === expenseId
    );
    setEditedExpenseData(expenseToEdit);
    setIsEditExpense(true);
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

  const handleStatusSortChange = (selectedVal) => {
    const selectedOption = selectedVal;

    // Sort expenses based on the selected option for "Entered By"
    let sortedExpenses = [...expenses];
    if (selectedOption) {
      sortedExpenses = sortedExpenses.filter(
        (expense) => expense.status === selectedOption
      );
    }

    setSortedExpenses(sortedExpenses);
  };

  const handleEnteredBySortChange = (selectedVal) => {
    const selectedOption = selectedVal;

    // Sort expenses based on the selected option for "Entered By"
    let sortedExpenses = [...expenses];
    if (selectedOption) {
      sortedExpenses = sortedExpenses.filter(
        (expense) => expense.createdBy === selectedOption
      );
    }

    setSortedExpenses(sortedExpenses);
  };

  const handleDialogData = (data) => {
    setIsLoading(true);

    if (data.companyName && data.companyEmail && data.phoneNumber) {
      if (editedExpenseData) {
        const updatedExpenses = expenses.map((expense) =>
          expense.id === editedExpenseData.id
            ? { ...editedExpenseData, ...data }
            : expense
        );
        setExpenses(updatedExpenses);
        setIsEditExpense(false);
      } else {
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
            createdAt: new Date().toLocaleDateString()
          },
        ]);
      }
    }
    setIsDialogOpen(false);
    setIsLoading(false);
    setIsEditExpense(false);
    setEditedExpenseData(null);
    setAnchorEl(null);
    setSelectedExpenseId(null);
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
    const searchedClients = clients.filter((client) =>
      client.company_name.toLowerCase().includes(searchValue.toLowerCase())
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
                <Box sx={{ width: "30%" }}>
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
                </Box>
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
                          handleMenuOpen(event, client.client_num)
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
                            handleEditExpense(selectedExpenseId);
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
      <EditExpense
        openDialog={isEditExpense}
        onClose={handleDialogData}
        initialData={editedExpenseData}
      />
    </>
  );
}
