import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function VendorTopbar({ toggleSidebar }) {

  return (
    <AppBar position="fixed">

      <Toolbar>

        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">
          Vendor Dashboard
        </Typography>

      </Toolbar>

    </AppBar>
  );
}

export default VendorTopbar;