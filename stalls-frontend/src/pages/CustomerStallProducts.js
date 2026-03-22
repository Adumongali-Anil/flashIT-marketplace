import React,{useEffect,useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Snackbar, Alert, Box, Typography, Button, TextField } from "@mui/material";

function CustomerStallProducts(){

const { id } = useParams();
const navigate = useNavigate();

const [products,setProducts] = useState([]);
const [search,setSearch] = useState("");
const [open,setOpen] = useState(false);

useEffect(()=>{
loadProducts();
// eslint-disable-next-line
},[id]);

const loadProducts = async ()=>{

const res =
await api.get(`/api/stalls/${id}/products`);

setProducts(res.data);

};

/* ADD TO CART */

const addToCart = async(productId)=>{

await api.post(`/api/cart/add/${productId}?quantity=1`);

window.dispatchEvent(new Event("cartUpdated"));

setOpen(true);

};

/* SEARCH FILTER */

const filteredProducts = products.filter(p =>
p.name.toLowerCase().includes(search.toLowerCase())
);

return(

<div style={{padding:"20px"}}>

<h2>Stall Products</h2>

{/* ⭐ SEARCH BAR */}

<TextField
placeholder="Search products..."
variant="outlined"
fullWidth
sx={{marginTop:"10px", marginBottom:"20px"}}
onChange={(e)=>setSearch(e.target.value)}
/>

{/* ⭐ EMPTY STALL */}

{products.length === 0 && (

<Box
sx={{
textAlign:"center",
marginTop:"80px"
}}
>

<Typography
variant="h5"
sx={{marginBottom:"15px"}}
>
This Stall Has No Products 😔
</Typography>

<Typography
sx={{
color:"gray",
marginBottom:"20px"
}}
>
Browse other products available in the shop
</Typography>

<Button
variant="contained"
onClick={()=>navigate("/shop")}
>
Browse Products
</Button>

</Box>

)}

{/* ⭐ PRODUCT GRID */}

{products.length > 0 && (

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
gap:"25px"
}}
>

{filteredProducts.map(p=>(

<ProductCard
key={p.id}
product={p}
onAdd={addToCart}
/>

))}

</div>

)}

{/* ADD TO CART POPUP */}

<Snackbar
open={open}
autoHideDuration={2000}
onClose={()=>setOpen(false)}
anchorOrigin={{
vertical:"top",
horizontal:"center"
}}
>

<Alert
severity="success"
variant="filled"
sx={{width:"100%"}}
>

Item added to cart 🛒

</Alert>

</Snackbar>

</div>

);

}

export default CustomerStallProducts;