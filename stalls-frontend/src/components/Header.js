import React, { useState } from "react";
import {
AppBar,
Toolbar,
Typography,
IconButton,
Avatar,
Menu,
MenuItem,
Box,
Divider
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

function Header({ toggleSidebar }) {

const navigate = useNavigate();
const [anchorEl, setAnchorEl] = useState(null);

const username =
localStorage.getItem("username") || "User";

const openMenu = (event) => {
setAnchorEl(event.currentTarget);
};

const closeMenu = () => {
setAnchorEl(null);
};

const logout = () => {
localStorage.clear();
navigate("/");
};

return (

<AppBar
position="fixed"
sx={{
background: "linear-gradient(135deg, #667eea, #764ba2)", // ✅ SAME GRADIENT
boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
}}
>

<Toolbar>

<IconButton color="inherit" onClick={toggleSidebar}>
<MenuIcon />
</IconButton>

<Typography variant="h6" sx={{ flexGrow: 1, fontWeight:"bold" }}>
Marketplace Dashboard
</Typography>

<Avatar
onClick={openMenu}
sx={{
cursor: "pointer",
bgcolor: "#fff",
color: "#000",
fontWeight: "bold"
}}
>
{username.charAt(0).toUpperCase()}
</Avatar>

<Menu
anchorEl={anchorEl}
open={Boolean(anchorEl)}
onClose={closeMenu}
PaperProps={{
sx:{
mt:1,
borderRadius:"12px"
}
}}
>

<Box sx={{ px: 2, py: 1 }}>
<Typography fontWeight="bold">{username}</Typography>
<Typography variant="caption">Logged In</Typography>
</Box>

<Divider/>

<MenuItem onClick={logout}>
Logout
</MenuItem>

</Menu>

</Toolbar>

</AppBar>

);

}

export default Header;