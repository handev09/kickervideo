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
import EditExpense from "./EditExpense";
import { fetchExpense } from "../state/redux/actions/expense/fetchExpense";
import LoadingSpinner from "./loadingSpinner";
import CreateContact from "./CreateContact";

export default function BudgetDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { budgetId } = useParams(); // Get the client's unique identifier from the URL
  const [budgetDetails, setBudgetDetails] = useState(null);
  const [budgetItems, setBudgetItems] = useState([]);
  const [sortedClients, setSortedClients] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditExpense, setIsEditExpense] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedExpenseData, setEditedExpenseData] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
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

  useEffect(() => {
    setSortedClients(budgetDetails);
    // setSortedExpenses(expensez);
  }, [budgetDetails]);

  const handleMenuOpen = (event, expenseId) => {
    console.log(expenseId);
    setAnchorEl(event.currentTarget);
    setSelectedExpenseId(expenseId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedExpenseId(null);
  };

  const handleDialogData = (data) => {
    setIsLoading(true);

    if (data.name && data.description && data.reimburse) {
      if (editedExpenseData) {
        const updatedExpenses = expenses.map((expense) =>
          expense.id === editedExpenseData.id
            ? { ...editedExpenseData, ...data }
            : expense
        );
        setExpenses(updatedExpenses);
        setIsEditExpense(false);
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
    dispatch(fetchExpense(parsedUser.userId))
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
    const searchedExpenses = budgetItems.filter((item) =>
      item.item_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSortedItems(searchedExpenses);
  }, [searchValue, budgetItems]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(searchValue);

  // Replace this with actual client data fetching logic using the clientId
  useEffect(() => {
    // Fetch client details based on clientId (e.g., from an API or local data)
    const fetchBudgetDetails = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch(
          `https://kickervideoapi.vercel.app/api/v1/budget/budget-details?budgetId=${budgetId}`
        );
        const data = await response.json();
        setBudgetDetails(data[0]);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    const fetchBudgetItems = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch(
          `https://kickervideoapi.vercel.app/api/v1/budget-items/fetch?budgetId=${budgetId}`
        );
        const data = await response.json();
        setBudgetItems(data);
        setSortedItems(data)
      } catch (error) {
        console.error("Error fetching budget Items:", error);
      }
    };

    fetchBudgetDetails();
    fetchBudgetItems();
  }, [budgetId]);

  if (!budgetDetails) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>BudgetDetails | VBudget </title>
      </Helmet>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Budget Details
          </Typography>
          <CreateContact
            openDialog={isDialogOpen}
            onClose={handleDialogData}
            comName={budgetDetails.company_name}
            comId={budgetDetails.client_id}
          />
          {/* <Button
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
          </Button> */}
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
              Project Title
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {budgetDetails.budget_name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Company Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {budgetDetails.client_name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Created At
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {budgetDetails.created_at}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Status
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {budgetDetails.status}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Notes
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {budgetDetails.internal_notes}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Company Contact
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {budgetDetails.company_client}
            </Typography>
          </Box>
        </Stack>

        {/* Comapny Address here */}

        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "20px",
            //   maxWidth: '800px',
            marginBottom: "20px",
            marginTop: "40px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Project SubTotal
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ${budgetDetails.subtotal}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Project Total
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ${budgetDetails.total}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Budget Number
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              #
              {budgetDetails.budget_numb
                ? budgetDetails.budget_numb
                : budgetDetails.budget_num}
            </Typography>
          </Box>
        </Stack>

        {/* Other Contacts */}
        <Typography variant="h4" gutterBottom>
          Line Items
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
                  label="Search Items..."
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
                  {budgetItems.length} Items
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
                {sortedItems.map((budget) => (
                  <div
                    key={budget.item_id}
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
                        {budget.item_name}
                      </Typography>
                      <Typography variant="body2">
                        {budget.item_description}
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "20%",
                      }}
                    >
                      <Typography variant="subtitle3">
                        {budget.created_at}
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
                        ${budget.item_cost}.00
                      </Typography>
                    </div>
                    <div>
                      <IconButton
                        onClick={(event) =>
                          handleMenuOpen(event, budget.contact_id)
                        }
                      >
                        <MoreVertIcon />
                      </IconButton>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        {/* <MenuItem
                        //   onClick={() => {
                        //     handleEditExpense(selectedExpenseId);
                        //   }}
                        >
                          Edit
                        </MenuItem> */}
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
