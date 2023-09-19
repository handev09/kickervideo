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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Iconify from "../components/iconify";
import { useSelector } from "react-redux";
import { BlogPostsSort, ExpensesSearch } from "../sections/@dashboard/expenses";
import CreateNewExpense from "./createExpense";
import EditExpense from "./EditExpense";
import { fetchExpense } from "../state/redux/actions/expense/fetchExpense";

export default function ExpensesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditExpense, setIsEditExpense] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedExpenseData, setEditedExpenseData] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [enteredByFilter, setEnteredByFilter] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);
      const id = parsedUser.userId;
      dispatch(fetchExpense(id));
    }
  }, [dispatch, navigate]);

  const expensez = useSelector((state) => state.expenses.expenses);
  console.log(expensez);

  useEffect(() => {
    setExpenses(expensez);
  }, [expensez]);

  const handleMenuOpen = (event, expenseId) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpenseId(expenseId);
  };

  const handleDialogData = (data) => {	
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
    setIsDialogOpen(false);	
    // setIsEditExpense(false);	
    setEditedExpenseData(null);	
    navigate('/dashboard/expenses')
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedExpenseId(null);
  };

  const handleEditExpense = (expenseId) => {
    const expenseToEdit = expensez.find((expense) => expense.id === expenseId);
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

  const uniqueEnteredByValues = [
    ...new Set(expensez.map((expense) => expense.createdBy)),
  ];

  const enteredByOptions = uniqueEnteredByValues.map((enteredBy) => ({
    value: enteredBy,
    label: enteredBy,
  }));

  const handleStatusSortChange = (selectedVal) => {
    setStatusFilter(selectedVal);
  };

  const handleEnteredBySortChange = (selectedVal) => {
    setEnteredByFilter(selectedVal);
  };

  // Filter expenses based on the search query
  const filteredExpenses = expenses.filter((expense) =>
    expense.expense_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting filters
  let sortedExpenses = [...filteredExpenses];

  if (statusFilter) {
    sortedExpenses = sortedExpenses.filter(
      (expense) => expense.status === statusFilter
    );
  }

  if (enteredByFilter) {
    sortedExpenses = sortedExpenses.filter(
      (expense) => expense.createdBy === enteredByFilter
    );
  }

  const handleDialogOpen = () => {	
    setIsDialogOpen(true);	
  };	
  const handleDeleteExpense = (expenseId) => {	
    const updatedExpenses = expenses.filter(	
      (expense) => expense.id !== expenseId	
    );	
    setExpenses(updatedExpenses);	
    setIsEditExpense(false)
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Expenses | VBudget </title>
      </Helmet>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Expenses
          </Typography>
          <CreateNewExpense
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
            New Expense
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
                  {sortedExpenses.length} Expenses
                </Badge>
              </Stack>
              <Stack
                mb={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <ExpensesSearch expenses={expenses} onSearch={setSearchQuery} />
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
                {sortedExpenses.map((expense) => (
                  <div
                    key={expense.id}
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
                        {expense.expense_name}
                      </Typography>
                      <Typography variant="body2">
                        {expense.description}
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "20%",
                      }}
                    >
                      <Typography variant="subtitle3">
                        {expense.created_at}
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
                        ${expense.cost}
                      </Typography>
                    </div>
                    <div>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, expense.id)}
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
                        <MenuItem
                          onClick={() => handleDeleteExpense(selectedExpenseId)}
                        >
                          Delete
                        </MenuItem>
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
