import React,{useEffect,useState} from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Snackbar, Alert, TextField } from "@mui/material";

function CustomerShop(){

const [products,setProducts]=useState([]);
const [filtered,setFiltered]=useState([]);

const [open,setOpen] = useState(false);
const [errorOpen, setErrorOpen] = useState(false);
const [errorMsg, setErrorMsg] = useState("");
const [search,setSearch] = useState("");

useEffect(()=>{
fetchProducts();
},[]);

const fetchProducts = async ()=>{

try {
  const res = await api.get("/api/products/all");
  setProducts(res.data);
  setFiltered(res.data);
} catch (err) {
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    (typeof err?.response?.data === "string" ? err.response.data : null) ||
    err?.message ||
    "Failed to load products";
  setErrorMsg(msg);
  setErrorOpen(true);
}

};

const addToCart = async(id)=>{

await api.post(`/api/cart/add/${id}?quantity=1`);

window.dispatchEvent(new Event("cartUpdated"));

setOpen(true);

};


// 🔍 SEARCH FILTER
const handleSearch = (e)=>{

const value = e.target.value;

setSearch(value);

const filteredProducts = products.filter(p =>
p.name.toLowerCase().includes(value.toLowerCase())
);

setFiltered(filteredProducts);

};

return(

<div style={{
  padding:"10px"
}}>

<h2 className="responsive-h2">Shop</h2>

{/* 🔍 SEARCH BAR */}

<TextField
label="Search products..."
variant="outlined"
fullWidth
value={search}
onChange={handleSearch}
style={{
marginTop:"10px",
marginBottom:"20px",
background:"#fff",
borderRadius:"10px"
}}
/>


{/* PRODUCT GRID - RESPONSIVE */}

<div className="product-grid-mobile">

{filtered.map(p=>(

<ProductCard
key={p.id}
product={p}
onAdd={addToCart}
/>

))}

</div>


{/* NO RESULTS */}

{filtered.length === 0 && (

<div
style={{
marginTop:"40px",
textAlign:"center",
color:"gray"
}}
>

<h3>No products found 🔍</h3>

</div>

)}


{/* ADD TO CART POPUP */}

<Snackbar
open={open}
autoHideDuration={2000}
onClose={()=>setOpen(false)}
anchorOrigin={{
vertical: "top",
horizontal: "center"
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

{/* API ERROR POPUP */}
<Snackbar
open={errorOpen}
autoHideDuration={4000}
onClose={() => setErrorOpen(false)}
anchorOrigin={{
vertical: "top",
horizontal: "center"
}}
>
<Alert
severity="error"
variant="filled"
sx={{width:"100%"}}
onClose={() => setErrorOpen(false)}
>
{errorMsg}
</Alert>
</Snackbar>

</div>

);

}

export default CustomerShop;