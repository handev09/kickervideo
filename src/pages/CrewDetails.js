import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Divider,
  Button,
} from "@mui/material";
import LoadingSpinner from "./loadingSpinner";
import { Link, useNavigate, useParams } from "react-router-dom";




const CrewDetails = () => {
    const [user, setUser]=useState(null)
    const { crewId } = useParams(); 

     // Replace this with actual client data fetching logic using the clientId
  useEffect(() => {
    // Fetch client details based on clientId (e.g., from an API or local data)
    const fetchCrewDetails = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch(
          `http://localhost:3001/api/v1/crew/details?crewId=${crewId}`
        );
        const data = await response.json();
        setUser(data[0]);

      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    // const fetchBudgetItems = async () => {
    //   try {
    //     // Replace this with your actual data fetching logic
    //     const response = await fetch(
    //       `https://kickervideoapi.vercel.app/api/v1/budget-items/fetch?budgetId=${budgetId}`
    //     );
    //     const data = await response.json();
    //     setBudgetItems(data);
    //   } catch (error) {
    //     console.error("Error fetching budget Items:", error);
    //   }
    // };


    fetchCrewDetails();
    // fetchBudgetItems();
  }, [crewId]);

  if (user === null) {
    // Render a loading spinner or other loading indicator
    return <LoadingSpinner />;
  }
  return (
    <div>
      {/* Title */}
      <Container>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "30px" }}>
          User Profile
        </Typography>
      </Container>

      {/* User Details */}
      <Container>
        <Box
          sx={{
            borderBottom: "solid 5px #E05858FF",
            maxWidth: "25%",
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#E05858FF" }}>
            Profile Details
          </Typography>
        </Box>
      </Container>

      <Container
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
          <Typography variant="body1">{user.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Phone
          </Typography>
          <Typography variant="body1">{user.phone}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Email
          </Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Address
          </Typography>
          <Typography variant="body1">{user.address}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Street
          </Typography>
          <Typography variant="body1">{user.street}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            State / Province
          </Typography>
          <Typography variant="body1">{user.state}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            City
          </Typography>
          <Typography variant="body1">{user.city}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Ward
          </Typography>
          <Typography variant="body1">{user.zip}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Role
          </Typography>
          <Typography variant="body1">{user.role}</Typography>
        </Box>
      </Container>

      <Divider sx={{ mb: "25px", mt: "31px" }} />

      {/* Rate, Cost, Markup, and Total */}
      <Container
        sx={{ display: "flex", alignItems: "center", mt: 10, gap: "20px" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            RATE
          </Typography>
          <Typography variant="body1">{user.contract_type}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1">COST</Typography>
          <Typography variant="body1">{user.cost}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1">MARKUP</Typography>
          <Typography variant="body1">{user.markup}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            TOTAL
          </Typography>
          <Typography variant="body1">{user.unitPrice}</Typography>
        </Box>
      </Container>

      {/* Profile Image */}
      {user.profileUrl && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Profile Image
          </Typography>
          <img
            src={user.profileUrl}
            alt="Profile"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        </Box>
      )}

      <Divider sx={{ mb: "25px", mt: "31px" }} />

      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "150px",
          width: "100%",
          padding: "10px",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
          <Button
            variant="filled"
            sx={{ backgroundColor: "#F3F4F6FF", color: "#565E6CFF" }}
          >
            Back
          </Button>
          {/* You can add an edit button here if you want to allow users to edit their profile */}
        </Box>
      </Container>
    </div>
  );
};

export default CrewDetails;
