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
      <CircularProgress color="primary" size={80} thickness={5} />
    </div>
  );
}

// LoadingSpinner;
