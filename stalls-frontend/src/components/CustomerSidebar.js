import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import StoreIcon from "@mui/icons-material/Store";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
// import PaymentIcon from "@mui/icons-material/Payment";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 250;

function CustomerSidebar({ open }) {

  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "Shop", icon: <StoreIcon />, path: "/shop" },
    { name: "Stalls", icon: <StoreMallDirectoryIcon />, path: "/stalls" },
    { name: "Orders", icon: <ReceiptIcon />, path: "/orders" },
    // { name: "Payments", icon: <PaymentIcon />, path: "/payments" }
  ];

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          top: "64px",
          background: "#0f172a",
          color: "#fff"
        }
      }}
    >
      <List>

        {menus.map(menu => {

          const active =
            location.pathname === menu.path;

          return (
            <ListItemButton
              key={menu.name}
              onClick={() => navigate(menu.path)}
              sx={{
                mx: 2,
                my: 1,
                borderRadius: 2,
                background:
                  active ? "#2563eb" : "transparent"
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
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

export default CustomerSidebar;