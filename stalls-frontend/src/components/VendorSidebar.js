import React from "react";
import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate, useLocation } from "react-router-dom";

function VendorSidebar({ open }) {

  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/vendor" },
    { name: "My Stalls", icon: <StoreIcon />, path: "/vendor/stalls" },
    { name: "Products", icon: <InventoryIcon />, path: "/vendor/products" },
    { name: "Orders", icon: <ShoppingBagIcon />, path: "/vendor/orders" },
    { name: "Revenue", icon: <CurrencyRupeeIcon />, path: "/vendor/revenue" },
  ];

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        position: "fixed",
        top: "64px",
        left: open ? 0 : "-250px",
        transition: "0.3s",
        background: "#0f172a",
        color: "white",
        padding: 3
      }}
    >
      <Typography variant="h6" sx={{ mb: 4 }}>
        Vendor Panel
      </Typography>

      {menu.map((item) => (
        <Box
          key={item.name}
          onClick={() => navigate(item.path)}
          sx={{
            display: "flex",
            gap: 2,
            padding: 2,
            borderRadius: 2,
            cursor: "pointer",
            background:
              location.pathname === item.path
                ? "#2563eb"
                : "transparent",
            "&:hover": {
              backgroundColor: "#1e293b"
            }
          }}
        >
          {item.icon}
          {item.name}
        </Box>
      ))}
    </Box>
  );
}

export default VendorSidebar;