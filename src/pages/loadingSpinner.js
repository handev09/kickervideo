import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {/* <CircularProgress color="primary" size={80} thickness={5} /> */}
      <CircularProgress
        style={{ color: "#E05858FF" }} // Set the color to "blue"
        size={80}
        thickness={5}
      />
    </div>
  );
}

// LoadingSpinner;
