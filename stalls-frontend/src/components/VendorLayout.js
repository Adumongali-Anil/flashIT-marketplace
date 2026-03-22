import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import VendorSidebar from "./VendorSidebar";
import Header from "./Header";
import Footer from "./Footer";

const drawerWidth = 250;

function VendorLayout() {

  const [open, setOpen] = useState(true);

  const dark = localStorage.getItem("darkMode") === "true";

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: dark
          ? "linear-gradient(135deg,#020617,#0f172a)"
          : "#f1f5f9"
      }}
    >

      {/* HEADER */}
      <Header toggleSidebar={() => setOpen(!open)} />

      {/* MAIN AREA */}
      <Box sx={{ display: "flex", flex: 1 }}>

        {/* SIDEBAR */}
        <VendorSidebar open={open} />

        {/* CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            mt: "64px",
            ml: open ? `${drawerWidth}px` : "0px",
            transition: "0.3s",
            p: 3
          }}
        >
          <Outlet />
        </Box>

      </Box>

      {/* FOOTER */}
      <Box sx={{ width: "100%" }}>
        <Footer />
      </Box>

    </Box>
  );
}

export default VendorLayout;