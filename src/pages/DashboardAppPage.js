import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
import { Link, useNavigate } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  useTheme,
  useMediaQuery,
  Container,
  Typography,
  Button,
  Card,
  Box,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import Iconify from '../components/iconify';

import { filter } from "lodash";
import { sentenceCase } from "change-case";
// import { useState } from 'react';
// @mui
import {
  // Card,
  Table,
  Stack,
  Paper,
  Avatar,
  // Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/crew";
// mock
// import USERLIST from "../_mock/user";
import { useSelector, useDispatch } from "react-redux";
// import { updateUser } from '../redux/actions/authActions';

import { updateUser } from "../state/redux/actions/users/updateUserAction";
import { fetchItems } from "../state/redux/actions/items/fetch";
import { fetchUserBudgets } from "../state/redux/actions/budget/updateUserBudgetsAction";
import { getUser } from "../state/redux/actions/users/getUser";
import StateIndicator from "../components/status-indicator/status";
import { fetchClients } from "../state/redux/actions/clients/fetch";
import { fetchExpense } from "../state/redux/actions/expense/fetchExpense";
import EditBudget from "./EditBudget";
import { deleteBudget } from "../state/redux/actions/budget/delete";
import LoadingSpinner from "./loadingSpinner";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "client", label: "Client", alignLeft: true },
  { id: "created", label: "Created", alignRight: false },
  { id: "project-title", label: "Project Title", alignRight: false },
  { id: "budget-number", label: "Budget#", alignRight: false },
  // { id: "isV  erified", label: "Verified", alignRight: false },
  { id: "isV  erified", label: "", alignRight: false },
  { id: "budget-amount", label: "Budget Amount", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.client_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DashboardAppPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading]=useState(false)
  //budgets from state
  const budgetz = useSelector((state) => state.budgets.budgets);
  const loading = useSelector((state) => state.budgets.loading);
  const error = useSelector((state) => state.budgets.error);
  const subscribedUser = useSelector((state) => state.user.user);

  // console.log(budgets);

  const registrationStatus = useSelector(
    (state) => state.auth.registrationStatus
  );
  const registrationError = useSelector(
    (state) => state.auth.registrationError
  );

  const user = useSelector((state) => state.login.user);
  // console.log(user);

  // if(user.isPaid===false){
  //   console.log('Subscription Ended')
  // }

  // console.log(registrationStatus);
  // const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State to control the cards visibility
  const [isFirstCardOpen, setIsFirstCardOpen] = useState(true);
  const [isSecondCardOpen, setIsSecondCardOpen] = useState(true);

  const handleFirstCardClose = () => {
    setIsFirstCardOpen(false);
  };

  const handleSecondCardClose = () => {
    setIsSecondCardOpen(false);
  };

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [budgetsTotal, setBudgetsTotal] = useState(0);
  const [editedBudgetData, setEditedBudgetData] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleOpenMenu = (event, budgetId) => {
    setOpen(event.currentTarget);
    setSelectedBudget(budgetId);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST`.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - budgets.length) : 0;

  const filteredUsers = applySortFilter(
    budgets,
    getComparator(order, orderBy),
    filterName
  );

  const handleEditBudget = (budgetId) => {
    const budgetToEdit = filteredUsers.find(
      (budget) => budget.budget_id === budgetId
    );
    setEditedBudgetData(budgetToEdit);
    setIsDialogOpen(true);
  };

  const handleDialogData = (data) => {
    setIsLoading(true)
    const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser); // Parse the storedUser string
      const id = parsedUser.userId;
      const fetchUserBudgets = async () => {
        try {
          // Replace this with your actual data fetching logic
          const response = await fetch(
            `http://localhost:3001/api/v1/budget/fetch?userId=${id}`
          );
          const data = await response.json();
          setBudgets(data)
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching client details:", error);
        }
      };

      fetchUserBudgets()
    // dispatch(fetchUserBudgets(id)).then(()=>{
      
    //   setIsLoading(false)
    // })
    console.log(data);
    setIsDialogOpen(false)
    // console.log(data)
  };

  useEffect(() => {
    // Check if the user is not logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // Redirect to the login page
      // navigate("/login");
      window.location.href = "/login";
    } else {
      // Retrieve user data from local storage
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser); // Parse the storedUser string
      const id = parsedUser.userId; // Access the userId property
      dispatch(fetchUserBudgets(id));
      dispatch(fetchItems(id));
      dispatch(fetchClients(id));
      dispatch(fetchExpense(id));
      setBudgetsTotal(budgets.length);
      // console.log(budgetsTotal);

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // Dispatch the updateUser action to update the user state in Redux store
        dispatch(updateUser(parsedUser));
      }
    }
  }, [isAuthenticated, navigate]);

  // useEffect(() => {
  //   setBudgets(budgets);
  //   // budgets=budget
  // }, [budgets]);

  useEffect(() => {
    setBudgets(budgetz);
    // budgets = budget;
  }, [budgetz]);





  const handleDeleteBudget = (budgetId) => {
    // console.log('id: '+budgetId)
    setIsLoading(true)
    // console.log(budgetId)
    dispatch(deleteBudget(budgetId)).then(()=>{
      dispatch(fetchUserBudgets(user)).then(()=>{
        const updatedBudgets = budgets.filter(budget => budget.budget_id !== budgetId);
      setBudgets(updatedBudgets);
      setIsLoading(false);
      setOpen(false);
      setSelected("")
        // setBudgets(budgets);
        // setIsLoading(false)
        // setOpen(false)
      
      })
    })
  }

  // useEffect(() => {
  //   if (user && user.id) {
  //     // Fetch user budgets when the user is logged in
  //     dispatch(fetchUserBudgets(user.id));
  //   }
  // }, [dispatch, user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (isLoading) {
    return <LoadingSpinner />;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  const isNotFound = !filteredUsers.length && !!filterName;

  const loggedInUser = localStorage.getItem("user");
  // console.log(loggedInUser);

  if (user) {
    // dispatch(getUser(user.userId))
    // console.log("Current User is LoggedIn");
    // console.log(user.isPaid);
    if (user.isPaid === false) {
      // If user is not paid, display a message and a button
      return (
        <>
          <Helmet>
            <title> Dashboard | Minimal UI </title>
          </Helmet>
          <Container>
            <Typography variant="h4" gutterBottom>
              {user && user.name ? `Welcome ${user.name}` : "Welcome"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your subscription has ended. Please renew your subscription to
              access all features.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#E05858FF",
                marginTop: 2,
              }}
              component={Link}
              to="/dashboard/pay"
            >
              Renew Subscription
            </Button>
          </Container>
        </>
      );
    }
  } else {
    // console.log("User not Logged in");
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {user && user.name ? `Welcome ${user.name}` : "Welcome"}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E05858FF",
              transition: "opacity 0.3s ease-in-out", // Adding a transition for smooth effect
              "&:hover": {
                opacity: 0.8,
                backgroundColor: "#E05858FF", // Adjust the opacity value as needed
              },
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={Link} // Use the Link component
            to="/dashboard/add-budget"
          >
            Create a Budget
          </Button>
        </Stack>

        <Container sx={{ display: "flex", flexDirection: "row" }}>
          {isFirstCardOpen && (
            <Card
              sx={{
                width: isMobile ? "100%" : "40%",
                marginBottom: isMobile ? "20px" : "0",
                backgroundColor: "#E05858FF",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h3">Welcome to vBudget</Typography>
                  <IconButton onClick={handleFirstCardClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ width: "80%", marginBottom: 5 }}
                >
                  See how VBudget helps video pros like you quickly develop
                  prduction budgets
                </Typography>
                <div
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    paddingTop: "56.25%",
                    position: "relative",
                  }}
                >
                  {/* Your video section goes here */}
                  {/* For example, you can use an embedded video player */}
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0 }}
                  ></iframe>
                </div>
                <IconButton onClick={handleFirstCardClose}>
                  {/* <CloseIcon /> */}
                </IconButton>
              </CardContent>
            </Card>
          )}

          {/* new card */}
          {isSecondCardOpen && (
            <Card
              sx={{
                width: isMobile ? "100%" : "40%",
                marginBottom: isMobile ? "20px" : "0",
                backgroundColor: "#CCCCCCFF",
                marginLeft: "20px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h3">Create</Typography>
                  <IconButton onClick={handleSecondCardClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "300px",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                    // justifyContent: 'center',

                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ width: "80%", marginBottom: 5, marginTop: "50px" }}
                  >
                    See how VBudget helps video pros like you quickly develop
                    production budgets
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: "#E05858FF" }}
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    component={Link} // Use the Link component
                    to="/dashboard/add-budget"
                  >
                    Create a Budget
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </Container>

        <Typography
          variant="h3"
          sx={{ width: "80%", marginBottom: 5, marginTop: "50px" }}
        >
          Budgets
        </Typography>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          {/* <Scrollbar sx={{backgroundColor: '#000'}}> */}
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={budgets.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      client_name,
                      created_at,
                      project_title,
                      total,
                      budget_id,
                      internalNotes,
                      tax,
                      status,
                      budget_num,
                      budget_numb
                    } = row;
                    const selectedBudget = selected.indexOf(client_name) !== -1;

                    return (
                      // <Link to={`/dashboard/budget-details/${id}`}>
                      <TableRow
                        hover
                        // key={id}
                        key={client_name}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedBudget}
                        sx={{ "& > *": { padding: "8px" } }}
                        // component="a"
                        // onClick={()=>{
                        //   navigate(`/dashboard/budget-details/${budget_id}`)
                        // }}
                      >
                        <TableCell>
                          {/* <Checkbox
                            checked={selectedBudget}
                            onChange={(event) => handleClick(event, name)}
                          /> */}
                        </TableCell>
                        {/* 
                        <Link to={`/dashboard/budget-details/${budget_id}`}> */}
                        <TableCell
                          component="a"
                          onClick={() => {
                            navigate(`/dashboard/budget-details/${budget_id}`);
                          }}
                          scope="row"
                          padding="none"
                          sx={{}}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            sx={{
                              display: "flex",
                              alignItems: "center", // Center text vertically
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{
                                textDecoration: "none",
                                fontWeight: "bold",
                              }}
                            >
                              {client_name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        {/* </Link> */}

                        <TableCell align="left">{created_at}</TableCell>

                        <TableCell align="left">{project_title}</TableCell>
                        <TableCell align="left">#{budget_numb?budget_numb:budget_num}</TableCell>

                        <TableCell align="left">
                          <StateIndicator
                            status={
                              status == "draft"
                                ? "Draft"
                                : status == "active"
                                ? "Active"
                                : status == "Approved"
                                ? "Approved"
                                : status == "Changesrequested"
                                ? "Changes Requested"
                                : status == "Converted"
                                ? "Converted"
                                : status == "Archived"
                                ? "Archived"
                                : "Status"
                            }
                          />
                        </TableCell>
                        <TableCell align="left">{`$${total}`}</TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            // sx={{width: '200px'}}
                            onClick={(event) =>
                              handleOpenMenu(event, budget_id)
                            }
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      // </Link>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {/* </Scrollbar> */}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem  onClick={() => {
              // console.log('Edit Clicked+')
              handleEditBudget(selectedBudget);
            }}>
          <Iconify
            icon={"eva:edit-fill"}
            sx={{ mr: 2 }}
           
          />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={() => {
              // console.log('Edit Clicked+')
              handleDeleteBudget(selectedBudget);
            }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>


{editedBudgetData &&(
  <EditBudget
  openDialog={isDialogOpen}
  onClose={handleDialogData}
  initialData={editedBudgetData}
/>
)}
      
    </>
  );
}
