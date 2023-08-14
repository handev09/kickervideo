import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";
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
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "client", label: "Client", alignLeft: true },
  { id: "created", label: "Created", alignRight: false },
  { id: "project-title", label: "Project Title", alignRight: false },
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
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DashboardAppPage() {
  //budgets from state
  const budgets = useSelector((state) => state.budgets.budgets);

  console.log(budgets);

  const registrationStatus = useSelector((state) => state.auth.registrationStatus);
const registrationError = useSelector((state) => state.auth.registrationError);

console.log(registrationStatus);
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

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  const handleChangePage = (event, newPage) => {
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    budgets,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

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
            Wecome Paul
          </Typography>

      
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E05858FF" }}
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={Link} // Use the Link component
            to="/dashboard/add-budget"
          >
            Create a Budget
          </Button>
        </Stack>

        <Container sx={{ display: "flex", flexDirection: "row" }}>
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

          {/* new card */}

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
                <IconButton onClick={handleFirstCardClose}>
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
                >
                  Create a Budget
                </Button>
              </div>
            </CardContent>
          </Card>
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
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody sx={{ backgroundColor: "#fff" }}>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      // id,
                      client,
                      createdAt,
                      projectTitle,
                      subtotal,
                      internalNotes,
                      tax,
                    } = row;
                    const selectedBudget = selected.indexOf(client) !== -1;

                    return (
                      <TableRow
                        hover
                        // key={id}
                        key={client}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedBudget}
                      >
                        <TableCell>
                          {/* <Checkbox
                            checked={selectedBudget}
                            onChange={(event) => handleClick(event, name)}
                          /> */}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            // spacing={}
                          >
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {client}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{createdAt}</TableCell>

                        <TableCell align="left">{projectTitle}</TableCell>

                        <TableCell align="left">
                          <Label
                            color={
                              (client === "banned" && "error") || "success"
                            }
                          >
                            {sentenceCase(client)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                         {`$${subtotal}`}
                        </TableCell>


                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            // sx={{width: '200px'}}
                            onClick={handleOpenMenu}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
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
            count={USERLIST.length}
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
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
