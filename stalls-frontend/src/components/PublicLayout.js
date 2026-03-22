import React from "react";
import { Box, Typography } from "@mui/material";

function PublicLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Marketplace
        </Typography>

        {children}
      </Box>
    </Box>
  );
}

export default PublicLayout;