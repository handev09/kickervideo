import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import {
  Grid,
  Container,
  Stack,
  Box,
  Typography,
  Paper,
  MenuItem,
  Badge,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { BlogPostsSort } from "../sections/@dashboard/blog";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Popover from "@mui/material/Popover";
import GetAppIcon from '@mui/icons-material/GetApp';

import { fetchUserBudgets } from "../state/redux/actions/budget/updateUserBudgetsAction";

const STATUS_COLORS = {
  Draft: "#E8EBEDFF", // Red
  awaitingresponse: "#FDEFDEFF", // Yellow
  changesrequested: "#F7E3DFFF", // Yellow
  approved: "#ECF3DCFF", // Green
  converted: "#E2F3EFFF", // Green
  archived: "#D9DFE1FF", // Green
  total: "#EDEAF7FF", // Green
  // Add more statuses and colors as needed
};

const dataForListGrowth = [
  {
    id: 1,
    jobNumber: "J123",
    clientName: "Client A",
    drafted: "2023-01-15",
    number: 42,
    status: "In Progress",
    open: "Yes",
  },
  {
    id: 2,
    jobNumber: "J124",
    clientName: "Client B",
    drafted: "2023-02-20",
    number: 17,
    status: "Completed",
    open: "No",
  },
  // Add more data as needed
];

const dataForCumulative = [
  {
    id: 1,
    jobNumber: "J125",
    clientName: "Client C",
    drafted: "2023-03-10",
    number: 88,
    status: "In Progress",
    open: "Yes",
  },
  {
    id: 2,
    jobNumber: "J126",
    clientName: "Client D",
    drafted: "2023-04-05",
    number: 33,
    status: "Completed",
    open: "No",
  },
  // Add more data as needed
];

const columns = [
  { id: "jobNumber", label: "Job#", sortable: true },
  { id: "clientName", label: "Client Name", sortable: true },
  { id: "drafted", label: "Drafted", sortable: true },
  { id: "number", label: "#", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "open", label: "Open", sortable: true },
];

export default function Reports() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budgets.budgets);

  const [selectedTab, setSelectedTab] = useState(0);

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sorting, setSorting] = useState({ column: "", direction: "asc" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonToggle = () => {
    if (isButtonClicked) {
      // Close the popover
      setAnchorEl(null);
    } else {
      // Open the popover
      setAnchorEl(document.getElementById("popover-button"));
    }
    setIsButtonClicked(!isButtonClicked);
  };

  const handlePopoverClose = () => {
    setIsButtonClicked(false);
    setAnchorEl(null);
  };
  
  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openPopover = Boolean(anchorEl);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const data = selectedTab === 0 ? dataForListGrowth : dataForCumulative;

  const handleSort = (columnId) => {
    if (sorting.column === columnId) {
      setSorting({
        ...sorting,
        direction: sorting.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSorting({ column: columnId, direction: "asc" });
    }
  };

  const sortedData = data.slice().sort((a, b) => {
    const aValue = a[sorting.column];
    const bValue = b[sorting.column];

    if (sorting.direction === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  useEffect(() => {
    // Check if the user is not logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // Redirect to the login page
      navigate("/login");
    } else {
      // Retrieve user data from local storage
      const storedUser = localStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser); // Parse the storedUser string
      const id = parsedUser.userId; // Access the userId property
      // dispatch(fetchUserCrew(id));
    }
  }, [dispatch, navigate]);

  // Calculate total amount for each status
  const statusTotals = {};
  budgets.forEach((budget) => {
    if (statusTotals[budget.status]) {
      statusTotals[budget.status] += budget.amount;
    } else {
      statusTotals[budget.status] = budget.amount;
    }
  });

  // Sorting options for the right section
  const SORT_OPTIONS = [
    { value: "30days", label: "Last 30 Days" },
    { value: "7days", label: "Last 7 Days" },
    // Add more sorting options as needed
  ];

  const [selectedSortOption, setSelectedSortOption] = useState("30days");

  // Handle sorting option change
  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value);
    // Add sorting logic here based on selectedSortOption
  };

  const tabStyles = {
    ".Mui-selected": {
      borderRadius: "10px",
      border: "2px solid #000",
    },
  };
  

  return (
    <>
      <Helmet>
        <title> Reports | VBudget </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Budget Report
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="column"
            sx={{ width: "65%", height: "550px", border: "1px solid #000" }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">Overview</Typography>
            </Paper>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: "20px" }}
            >
              {/* compose the boxes dynamically */}
              <Box sx={{ width: "40%" }}>
                <Badge
                  sx={{
                    backgroundColor: "#E8EBEDFF",
                    padding: "10px",
                    width: "50%",
                  }}
                >
                  0
                </Badge>
                <Typography variant="p">draft</Typography>
              </Box>
              <Typography variant="p">$0.00</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: "20px" }}
            >
              {/* compose the boxes dynamically */}
              <Box sx={{ width: "40%" }}>
                <Badge
                  sx={{
                    backgroundColor: "#FDEFDEFF",
                    padding: "10px",
                    width: "50%",
                  }}
                >
                  0
                </Badge>
                <Typography variant="p">awaiting response</Typography>
              </Box>
              <Typography variant="p">$0.00</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: "20px" }}
            >
              {/* compose the boxes dynamically */}
              <Box sx={{ width: "40%" }}>
                <Badge
                  sx={{
                    backgroundColor: "#F7E3DFFF",
                    padding: "10px",
                    width: "50%",
                  }}
                >
                  0
                </Badge>
                <Typography variant="p">chenages requested</Typography>
              </Box>
              <Typography variant="p">$0.00</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: "20px" }}
            >
              {/* compose the boxes dynamically */}
              <Box sx={{ width: "40%" }}>
                <Badge
                  sx={{
                    backgroundColor: "#ECF3DCFF",
                    padding: "10px",
                    width: "50%",
                  }}
                >
                  0
                </Badge>
                <Typography variant="p">approved</Typography>
              </Box>
              <Typography variant="p">$0.00</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: "20px" }}
            >
              {/* compose the boxes dynamically */}
              <Box sx={{ width: "40%" }}>
                <Badge
                  sx={{
                    backgroundColor: "#E2F3EFFF",
                    padding: "10px",
                    width: "50%",
                  }}
                >
                  0
                </Badge>
                <Typography variant="p">converted</Typography>
              </Box>
              <Typography variant="p">$0.00</Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: "20px" }}
            >
              {/* compose the boxes dynamically */}
              <Box sx={{ width: "40%" }}>
                <Badge
                  sx={{
                    backgroundColor: "#D9DFE1FF",
                    padding: "10px",
                    width: "50%",
                  }}
                >
                  0
                </Badge>
                <Typography variant="p">archived</Typography>
              </Box>
              <Typography variant="p">$0.00</Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: "20px" }}
            >
              {/* compose the boxes dynamically */}
              <Box sx={{ width: "40%" }}>
                <Badge
                  sx={{
                    backgroundColor: "#EDEAF7FF",
                    padding: "10px",
                    width: "50%",
                  }}
                >
                  0
                </Badge>
                <Typography variant="p">total</Typography>
              </Box>
              <Typography variant="p">$0.00</Typography>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            sx={{ width: "35%", height: "384px", border: "1px solid #000" }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">Sorting Options</Typography>
            </Paper>

            <Box sx={{ width: "100%" }}>
              <Typography>Created within</Typography>
              <BlogPostsSort
                options={SORT_OPTIONS}
                // onSort={}
              />
            </Box>
          </Stack>
        </Stack>

        {/* The table */}

        <Paper
          elevation={3}
          sx={{
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            backgroundColor: '#F4F4F4FF',
            marginTop: '50px'
          }}
        >
          <Typography variant="h6">Showing 50 vEntries</Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: "green",
              color: "green",
              "&:hover": {
                borderColor: "green",
                color: "green",
              },
            }}
            onClick={handlePopoverClick}
          >
        Export Excel Copy
             {isButtonClicked ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <Typography variant="h6">Options</Typography> */}
              <MenuItem>Overview</MenuItem>
              <MenuItem>Export Excel Copy</MenuItem>
            </Paper>
          </Popover>
        </Paper>

        <div>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Tab navigation"
          sx={tabStyles} // Apply custom tab styles
          TabIndicatorProps={{
            style: {
              display: "none", // Hide the default indicator
            },
          }}
        >
          <Tab label="List Growth" />
          <Tab label="Cumulative" />
        </Tabs>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <div
                        onClick={() => handleSort(column.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {column.label}
                        {sorting.column === column.id &&
                          (sorting.direction === "asc" ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.jobNumber}</TableCell>
                    <TableCell>{row.clientName}</TableCell>
                    <TableCell>{row.drafted}</TableCell>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.open}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="pagination">
            <div className="pagination-info">
              Showing 1 to {sortedData.length} of {sortedData.length} entries
            </div>
            <Pagination count={Math.ceil(sortedData.length / 10)} />
          </div>
        </div>
      </Container>
    </>
  );
}
