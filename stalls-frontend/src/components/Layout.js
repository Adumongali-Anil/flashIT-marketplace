import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const drawerWidth = 250;

function Layout() {

  const [open, setOpen] = useState(false);

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
        <Sidebar open={open} setOpen={setOpen} />

        {/* CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            mt: "64px",
            ml: open ? `${drawerWidth}px` : "0px",
            transition: "all 0.35s ease",
            p: 4
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

export default Layout;