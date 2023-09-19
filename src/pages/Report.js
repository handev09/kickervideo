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
import { BlogPostsSort } from "../sections/@dashboard/expenses";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Popover from "@mui/material/Popover";

import { fetchUserBudgets } from "../state/redux/actions/budget/updateUserBudgetsAction";
import { number } from "prop-types";

const STATUS_COLORS = {
  draft: "#E8EBEDFF", // Red
  awaitingresponse: "#FDEFDEFF", // Yellow
  changesrequested: "#F7E3DFFF", // Yellow
  approved: "#ECF3DCFF", // Green
  converted: "#E2F3EFFF", // Green
  archived: "#D9DFE1FF", // Green
  total: "#EDEAF7FF", // Green
  // Add more statuses and colors as needed
};

const columns = [
  { id: "jobNumber", label: "Job#", sortable: true },
  { id: "clientName", label: "Client Name", sortable: true },
  { id: "drafted", label: "Drafted", sortable: true },
  { id: "number", label: "#", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "open", label: "Open", sortable: true },
];

export default function Reports() {
  let statusTot = {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budgets.budgets);
  console.log(budgets);
  const [selectedTab, setSelectedTab] = useState(0);

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

  // Replace dataForListGrowth with all budgets data
  const dataForListGrowth = budgets;

  // Replace dataForCumulative with data that has any status other than "draft"
  const dataForCumulative = budgets.filter(
    (budget) => budget.status !== "draft"
  );

  const data = selectedTab === 0 ? dataForListGrowth : dataForCumulative;

  const sortData = (data, column, direction) => {
    return data.slice().sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (direction === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  };

  // const handleSort = (columnId) => {
  //   if (sorting.column === columnId) {
  //     setSorting({
  //       ...sorting,
  //       direction: sorting.direction === "asc" ? "desc" : "asc",
  //     });
  //   } else {
  //     setSorting({ column: columnId, direction: "asc" });
  //   }
  // };

  const handleSort = (columnId) => {
    let direction = "asc";
    if (sorting.column === columnId && sorting.direction === "asc") {
      direction = "desc";
    }
    setSorting({ column: columnId, direction });
  };

  // const sortedData = data.slice().sort((a, b) => {
  //   const aValue = a[sorting.column];
  //   const bValue = b[sorting.column];

  //   if (sorting.direction === "asc") {
  //     return aValue < bValue ? -1 : 1;
  //   } else {
  //     return aValue > bValue ? -1 : 1;
  //   }
  // });

  // Apply sorting to the data
  const sortedData = sortData(data, sorting.column, sorting.direction);

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
      statusTotals[budget.status] += budget.total;
    } else {
      statusTotals[budget.status] = budget.total;
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

  // Code for calculating budget totals based on status and render the UI

  const [statusCounts, setStatusCounts] = useState({}); // To store status counts
  const [statusTotal, setStatusTotal] = useState({}); // To store status totals
  const [totalBudgets, setTotalBudgets] = useState(0); // Total number of budgets
  const [totalSum, setTotalSum] = useState(0); // Total sum of budgets
  // Initialize two state variables for status totals and budget totals
  const [statusTotalsSum, setStatusTotalsSum] = useState(0);
  const [budgetTotalsSum, setBudgetTotalsSum] = useState(0);

  useEffect(() => {
    // Calculate counts and totals when budgets change
    const calculateCountsAndTotals = () => {
      const counts = {};
      const totals = {};
      let statusTotalsSum = 0; // Initialize status totals sum
      let budgetTotalsSum = 0; // Initialize budget totals sum

      budgets.forEach((budget) => {
        // Include the statuses you want to count
        if (
          [
            "draft",
            "awaitingresponse",
            "changesrequested",
            "approved",
            "converted",
            "archived",
          ].includes(budget.status.toLowerCase())
        ) {
          // Update status counts
          if (counts[budget.status]) {
            counts[budget.status]++;
          } else {
            counts[budget.status] = 1;
          }

          // Update status totals
          if (totals[budget.status]) {
            totals[budget.status] =
              parseFloat(totals[budget.status]) + parseFloat(budget.total);

            console.log(totals[budget.status]);
          } else {
            totals[budget.status] = budget.total;
          }

          // Update total sum
          totals["total"] =
            parseFloat(totals["total"] || 0) + parseFloat(budget.total);
        }
      });

      // Calculate total number of budgets
      const totalBudgets = Object.values(counts).reduce(
        (total, count) => total + count,
        0
      );

      setStatusCounts(counts);
      setStatusTotal(totals);
      setTotalBudgets(totalBudgets);
      setTotalSum(totals["total"] || 0);
    };

    calculateCountsAndTotals();
  }, [budgets]);

  // Update the UI with status counts and totals
  const renderStatusCounts = () => {
    return (
      <Stack direction="column">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Stack
            key={status}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: "20px" }}
          >
            <Box sx={{ width: "40%" }}>
              <Badge
                sx={{
                  backgroundColor: STATUS_COLORS[status.toLowerCase()],
                  padding: "10px",
                  width: "40%",
                  // textAlign: 'center',
                  // alignItems: 'center',
                  // display: 'flex',
                  // flexDirection: 'row'
                  // justifyContent: 'center'
                }}
              >
                <Typography variant="p" sx={{ marginLeft: "40px" }}>
                  {count}
                </Typography>
              </Badge>
              <Typography variant="p" sx={{ marginLeft: "20px" }}>
                {status == "Draft"
                  ? "Draft"
                  : status == "Awaitingresponse"
                  ? "Awaiting Response"
                  : status == "Approved"
                  ? "Approved"
                  : status == "Changesrequested"
                  ? "Changes Requested"
                  : status == "Converted"
                  ? "Converted"
                  : status == "Archived"
                  ? "Archived"
                  : "Status"}
              </Typography>
            </Box>
            <Typography variant="p">${statusTotal[status] || 0}.00</Typography>
          </Stack>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Helmet>
        <title> Reports | VBudget </title>
      </Helmet>

      <Stack>
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

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Stack
            direction="column"
            sx={{ width: "63%", height: "550px", border: "1px solid #f0f0f0" }}
          >
            <Paper
              sx={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#F4F4F4FF",
              }}
            >
              <Typography variant="h6">Overview</Typography>
            </Paper>
            {/* Group Container for all status */}
            <Stack sx={{ width: "100%", height: "550px", padding: "20px" }}>
              {/* place the dynamic ui */}

              {renderStatusCounts()}
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
                      backgroundColor: STATUS_COLORS["total"],
                      padding: "10px",
                      width: "40%",
                    }}
                  >
                    <Typography variant="p" sx={{ marginLeft: "40px" }}>
                      {totalBudgets}
                    </Typography>
                  </Badge>
                  <Typography variant="p" sx={{ marginLeft: "20px" }}>
                    Total
                  </Typography>
                </Box>
                <Typography variant="p">${totalSum}.00</Typography>
              </Stack>

              {/* Maunal UI */}
            </Stack>
          </Stack>
          <Stack
            direction="column"
            sx={{ width: "35%", height: "550px", border: "1px solid #f0f0f0" }}
          >
            <Paper
              sx={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#F4F4F4FF",
              }}
            >
              <Typography variant="h6">Sorting Options</Typography>
            </Paper>

            <Box sx={{ width: "100%", padding: "20px" }}>
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
            justifyContent: "space-between",
            backgroundColor: "#F4F4F4FF",
            marginTop: "50px",
            marginBottom: "30px",
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
                  <TableRow key={row.budget_num}>
                    <TableCell>{`Job#${row.budget_num}`}</TableCell>
                    <TableCell>{row.client_name}</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell>{row.budget_num}</TableCell>
                    <TableCell>
                      {row.status == "draft"
                        ? "Draft"
                        : row.status == "awaitingresponse"
                        ? "Awaiting Response"
                        : row.status == "approved"
                        ? "Approved"
                        : row.status == "changesrequested"
                        ? "Changes Requested"
                        : row.status == "converted"
                        ? "Converted"
                        : row.status == "archived"
                        ? "Archived"
                        : "Status"}
                    </TableCell>
                    {/* <TableCell>{row.open}</TableCell> */}
                    <TableCell>Yes</TableCell>
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
      </Stack>
    </>
  );
}
