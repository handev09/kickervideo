import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Iconify from "../components/iconify";
// import { useSelector } from "react-redux";
import { BlogPostsSort, ExpensesSearch } from "../sections/@dashboard/expenses";
// import POSTS from "../_mock/blog";
import CreateNewExpense from "./createExpense";
import EditExpense from "./EditExpense";
import { fetchExpense } from "../state/redux/actions/expense/fetchExpense";
import LoadingSpinner from './loadingSpinner'
import CreateNewLineItem from "./CreateNewLineItem";
import { addItem } from '../state/redux/actions/items/create'
import { fetchItems } from '../state/redux/actions/items/fetch'


export default function ExpensesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditExpense, setIsEditExpense] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedExpenseData, setEditedExpenseData] = useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
 const [isLoading, setIsLoading] = useState(false);


const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);

      const itemz = useSelector((state) => state.items.items);
      console.log(itemz);
      const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // navigate("/login");
      window.location.href = '/login';
    } else {
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);
      const id = parsedUser.userId;
      dispatch(fetchExpense(id));
      setSortedItems(itemz);
      
    }
  }, [dispatch, navigate]);
   

  

 
  // setSortedItems(itemz)

  useEffect(() => {
    setItems(itemz);
  
      // Filter items based on the search query
      const searchedItems = items.filter((item) =>
        item.item_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSortedItems(searchedItems);
    }, [searchValue, items]);
   


  const handleMenuOpen = (event, expenseId) => {
    console.log(expenseId)
    setAnchorEl(event.currentTarget);
    setSelectedExpenseId(expenseId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedExpenseId(null);
  };

  

  
  

  

  const handleDialogData = (data) => {
    console.log(data)
 setIsLoading(true); 

    if (data.name && data.description) {
      if (editedExpenseData) {
        const updatedExpenses = expenses.map((expense) =>
          expense.id === editedExpenseData.id
            ? { ...editedExpenseData, ...data }
            : expense
        );
        setExpenses(updatedExpenses);
        setIsEditExpense(false);
      } else {
        setItems((prevItems) => [
          ...prevItems,
          {
            id: data.id,
            name: data.name,
            description: data.description,
            optionValue: data.optionValue,
            createdAt: new Date().toLocaleDateString(),
            total: data.cost,
          },
        ]);
        const newItem = {
          id: data.id,
            name: data.name,
            description: data.description,
            optionValue: data.optionValue,
            createdAt: new Date().toLocaleDateString(),
            markup: data.markup,
            cost: data.unitPrice,
            userId: parsedUser.userId
        }
        dispatch(addItem(newItem)).then((res) => {
          console.log('item added')
          // Fetching is complete, set isLoading back to false
          dispatch(fetchItems(parsedUser.userId)).then(()=>{
          }).catch((error)=>{
            console.log(error);
          });
          console.log('set items data here')
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle any errors here, and also set isLoading back to false
          console.error("Error fetching expenses:", error);
          setIsLoading(false);
        });
       


      }
    }
dispatch(fetchExpense(parsedUser.userId))
    .then(() => {
      // Fetching is complete, set isLoading back to false
      console.log('set expenses data here')
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
  

 
  // Define a state variable for filtered items
const [filteredItems, setFilteredItems] = useState(sortedItems);
  // useEffect(() => {
  //   // Filter expenses based on the search query
   
  //   setSortedItems(searchedItems);
  // }, [searchValue]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  
  };


 if(isLoading){
    return (
      <LoadingSpinner />
    )
  }


  return (
    <>
      <Helmet>
        <title> Dashboard: Items | VBudget </title>
      </Helmet>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Line Items
          </Typography>
          <CreateNewLineItem
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
            New LineItem
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
                  {sortedItems.length} Items
                </Badge>
              </Stack>
              <Stack
                mb={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                 <TextField
                  label="Search Expenses..."
                  variant="outlined"
                  fullWidth
                  value={searchValue}
                  onChange={(e)=>{
                    handleSearchChange(e)
                  }}
                  style={{ marginBottom: "16px", maxWidth: "30%" }}
                />
                
              </Stack>
              <Stack
                sx={{
                  border: "1px solid #ccc",
                  height: "600px",
                  width: "100%",
                  padding: "10px",
                }}
              >
                {sortedItems.map((item) => (
                  <div
                    key={item.id}
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
                        {item.item_name}
                      </Typography>
                      <Typography variant="body2">
                        {item.item_desc}
                      </Typography>
                    </div>
                    <div
                      style={{
                        width: "20%",
                      }}
                    >
                      <Typography variant="subtitle3">
                        {item.created_at}
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
                        ${item.cost}
                      </Typography>
                    </div>
                    <div>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, item.item_id)}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        {/* <MenuItem
                          onClick={() => {
                            handleEditExpense(selectedExpenseId);
                          }}
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


