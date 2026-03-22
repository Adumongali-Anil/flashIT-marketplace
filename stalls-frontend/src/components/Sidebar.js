import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 250;

function Sidebar({ open, setOpen }) {

  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { name: "Users", icon: <PeopleIcon />, path: "/admin/users" },
    { name: "Vendors", icon: <StoreIcon />, path: "/admin/vendors" },
    { name: "Stalls", icon: <HomeWorkIcon />, path: "/admin/stalls" },
    { name: "Products", icon: <InventoryIcon />, path: "/admin/products" },
    { name: "Orders", icon: <ShoppingCartIcon />, path: "/admin/orders" },
    { name: "Revenue", icon: <CurrencyRupeeIcon />, path: "/admin/revenue" }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false); // ✅ CLOSE SIDEBAR AFTER CLICK
  };

  return (
    <Drawer
      variant="temporary"   // 🔥 IMPORTANT
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          top: "64px",
          height: "calc(100% - 64px)",
          background: "#0f172a",
          color: "#fff"
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography fontWeight="bold">
          Admin Panel
        </Typography>
      </Box>

      <List>

        {menus.map((menu) => {

          const active = location.pathname === menu.path;

          return (
            <ListItemButton
              key={menu.name}
              onClick={() => handleNavigation(menu.path)}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: "12px",
                background: active ? "#2563eb" : "transparent",
                width: "85%",
                transition: "0.3s",

                "&:hover": {
                  background: "#1e293b"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: "40px"
                }}
              >
                {menu.icon}
              </ListItemIcon>

              <ListItemText primary={menu.name} />

            </ListItemButton>
          );
        })}

      </List>
    </Drawer>
  );
}

export default Sidebar;