import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import CustomerSidebar from "./CustomerSidebar";
import CustomerHeader from "./CustomerHeader";
import Footer from "./Footer";

const drawerWidth = 250;

function CustomerLayout() {

  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (

    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HEADER */}
      <CustomerHeader toggleSidebar={toggleSidebar} />

      {/* MAIN AREA */}
      <Box sx={{ display: "flex", flex: 1 }}>

        {/* SIDEBAR */}
        <CustomerSidebar open={open} />

        {/* CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            mt: "64px",
            ml: open ? `${drawerWidth}px` : "0px",
            p: 4,
            background: "#f1f5f9"
          }}
        >
          <Outlet />
        </Box>

      </Box>

      {/* ✅ FOOTER OUTSIDE FLEX ROW */}
      <Box sx={{ width: "100%" }}>
        <Footer />
      </Box>

    </Box>

  );
}

export default CustomerLayout;