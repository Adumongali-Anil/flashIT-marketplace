import React,{useState,useEffect} from "react";
import {
AppBar,
Toolbar,
Typography,
IconButton,
Avatar,
Menu,
MenuItem,
Badge,
Divider,
Box
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CustomerHeader({toggleSidebar}){

const navigate = useNavigate();

const [anchorEl,setAnchorEl] = useState(null);
const [cartCount,setCartCount] = useState(0);

const username =
localStorage.getItem("username") || "User";

const loadCartCount = async ()=>{

try{

const res = await api.get("/api/cart/my-cart");

setCartCount(res.data.length);

}catch(err){

console.log(err);

}

};

useEffect(()=>{

loadCartCount();

/* LISTEN CART UPDATE EVENT */

window.addEventListener("cartUpdated",loadCartCount);

return ()=>{

window.removeEventListener("cartUpdated",loadCartCount);

};

},[]);

const openMenu=(e)=>{
setAnchorEl(e.currentTarget);
};

const closeMenu=()=>{
setAnchorEl(null);
};

const logout=()=>{
localStorage.clear();
navigate("/");
};

return(

<AppBar position="fixed">

<Toolbar>

<IconButton
color="inherit"
onClick={toggleSidebar}
>
<MenuIcon/>
</IconButton>

<Typography sx={{flexGrow:1}}>
Marketplace Shop
</Typography>

<IconButton
color="inherit"
onClick={()=>navigate("/cart")}
>

<Badge
badgeContent={cartCount}
color="error"
>
<ShoppingCartIcon/>
</Badge>

</IconButton>

<Avatar
onClick={openMenu}
sx={{
ml:2,
cursor:"pointer",
bgcolor:"#fff",
color:"#000"
}}
>
{username.charAt(0).toUpperCase()}
</Avatar>

<Menu
anchorEl={anchorEl}
open={Boolean(anchorEl)}
onClose={closeMenu}
>

<Box sx={{px:2,py:1}}>

<Typography fontWeight="bold">
{username}
</Typography>

<Typography variant="caption">
Customer
</Typography>



</Box>

<Divider/>
{/* <MenuItem onClick={() => {
  const current = localStorage.getItem("darkMode") === "true";
  localStorage.setItem("darkMode", !current);
  window.location.reload();
}}>
  {localStorage.getItem("darkMode") === "true" ? "☀️ Light Mode" : "🌙 Dark Mode"}
</MenuItem> */}

<MenuItem onClick={logout}>
Logout
</MenuItem>

</Menu>

</Toolbar>

</AppBar>

);

}

export default CustomerHeader;