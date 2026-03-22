import React from "react";
import { Paper } from "@mui/material";

function AdminTableWrapper({ children }) {

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 12px 35px rgba(0,0,0,0.15)"
        }
      }}
    >
      {children}
    </Paper>
  );
}

export default AdminTableWrapper;