import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SelectRole() {

  const navigate = useNavigate();

  const goToRegister = (role) => {
    navigate("/register", { state: { role } });
  };

  return (

    <Box sx={container}>

      <Paper sx={card} >

        <Typography variant="h5" mb={3} fontWeight="bold">
          Register As
        </Typography>

        <Button
          fullWidth
          sx={btn}
          onClick={() => goToRegister("CUSTOMER")}
        >
          Customer
        </Button>

        <Button
          fullWidth
          sx={btn}
          onClick={() => goToRegister("VENDOR")}
        >
          Vendor
        </Button>

        <Button
          fullWidth
          sx={btn}
          onClick={() => goToRegister("ADMIN")}
        >
          Admin
        </Button>

      </Paper>

    </Box>
  );
}

/* STYLES */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#667eea,#764ba2)"
};

const card = {
  p: 4,
  width: 400,
  textAlign: "center",
  borderRadius: "16px",
  animation: "fadeIn 0.6s ease"
};

const btn = {
  mb: 2,
  padding: "12px",
  borderRadius: "10px",
  fontWeight: "bold"
};

export default SelectRole;