import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  IconButton,
  InputBase,
  Badge
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

function Topbar({ toggleSidebar }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const token = localStorage.getItem("token");
  let username = "Admin";

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    username = payload.sub;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Left Title */}

        <IconButton onClick={toggleSidebar}>
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Marketplace Dashboard
        </Typography>

        {/* Center Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f1f5f9",
            padding: "4px 12px",
            borderRadius: "20px",
            width: "300px"
          }}
        >
          <SearchIcon sx={{ color: "#64748b", marginRight: 1 }} />
          <InputBase placeholder="Search..." fullWidth />
        </Box>

        {/* Right Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{ cursor: "pointer" }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem disabled>{username}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Topbar;