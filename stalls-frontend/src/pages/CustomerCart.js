import React,{useEffect,useState} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import {
Grid,
Card,
CardMedia,
CardContent,
Typography,
Button,
Box
} from "@mui/material";

function CustomerCart(){

const [cart,setCart] = useState([]);
const navigate = useNavigate();

useEffect(()=>{
loadCart();
},[]);

const loadCart = async ()=>{

const res = await api.get("/api/cart/my-cart");

setCart(res.data);

};

const increase = async(item)=>{

if(item.quantity >= item.product.stock){

alert("Maximum stock reached");

return;

}

await api.post(`/api/cart/add/${item.product.id}?quantity=1`);

window.dispatchEvent(new Event("cartUpdated"));

loadCart();

};

const decrease = async(item)=>{

if(item.quantity===1){

await api.delete(`/api/cart/remove/${item.id}`);

}else{

await api.post(`/api/cart/add/${item.product.id}?quantity=-1`);

}

window.dispatchEvent(new Event("cartUpdated"));

loadCart();

};

const removeItem = async(id)=>{

await api.delete(`/api/cart/remove/${id}`);

window.dispatchEvent(new Event("cartUpdated"));

loadCart();

};

const totalPrice = cart.reduce(
(sum,item)=> sum + item.product.price * item.quantity,
0
);

const handlePayment = ()=>{

const options = {

key: "rzp_test_SKpsVSA2lU5EEg",

amount: totalPrice * 100,

currency: "INR",

name: "Marketplace Shop",

description: "Order Payment",

handler: async function () {

await api.post("/api/orders/checkout");

alert("Payment Successful");

window.dispatchEvent(new Event("cartUpdated"));

window.location.href="/orders";

},

method: {
  netbanking: true,
  card: true,
  upi: true,
  wallet: true,
  emi: true,
  paylater: true
},

prefill: {
  name: localStorage.getItem("username") || "Customer",
  email: localStorage.getItem("email") || "",
  contact: localStorage.getItem("phone") || ""
},

theme:{
color:"#1976d2"
}

};

const rzp = new window.Razorpay(options);

rzp.open();

};

return(

<div style={{
  padding:"10px"
}}>

<h2 className="responsive-h2" style={{marginBottom:"20px"}}>My Cart</h2>

{/* ⭐ CART EMPTY UI */}

{cart.length === 0 && (

<Box
sx={{
textAlign:"center",
marginTop:{xs:"40px", sm:"60px", md:"80px"}
}}
>

<Typography
variant="h5"
sx={{marginBottom:"15px"}}
>
Your Cart is Empty 🛒
</Typography>

<Typography
sx={{
color:"gray",
marginBottom:"20px"
}}
>
Browse products and add items to your cart
</Typography>

<Button
variant="contained"
color="primary"
onClick={()=>navigate("/shop")}
>
Browse Products
</Button>

</Box>

)}

{/* ⭐ CART ITEMS */}

{cart.length > 0 && (

<>

<Grid container spacing={{xs:1.5, sm:2, md:3}}>

{cart.map(c=>(

<Grid item xs={12} sm={6} md={4} lg={3} key={c.id}>

<Card
sx={{
borderRadius:"18px",
overflow:"hidden",
boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
transition:"0.3s",

"&:hover":{
transform:"translateY(-8px) scale(1.02)",
boxShadow:"0 15px 35px rgba(0,0,0,0.25)"
}

}}
>

<CardMedia
component="img"
image={c.product.imageUrl}
sx={{
height:{xs:140, sm:160, md:180},
objectFit:"cover"
}}
/>

<CardContent>

<Typography variant="h6">
{c.product.name}
</Typography>

<Typography
sx={{color:"red",fontWeight:"bold"}}
>
₹{c.product.price}
</Typography>

<Typography
sx={{color:"green",fontSize:"13px"}}
>
{c.product.stock - c.quantity} remaining
</Typography>

<Box
sx={{
display:"flex",
alignItems:"center",
gap:1,
mt:2
}}
>

<Button
variant="outlined"
onClick={()=>decrease(c)}
>
-
</Button>

<Typography>
{c.quantity}
</Typography>

<Button
variant="outlined"
onClick={()=>increase(c)}
>
+
</Button>

</Box>

<Button
variant="contained"
color="error"
sx={{mt:2}}
onClick={()=>removeItem(c.id)}
>
Remove
</Button>

</CardContent>

</Card>

</Grid>

))}

</Grid>

{/* ⭐ PAYMENT SECTION */}

<Box
sx={{
mt:3,
p:{xs:2, sm:3},
borderRadius:"15px",
boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
display:"flex",
flexDirection:{xs:"column", sm:"row"},
justifyContent:"space-between",
alignItems:{xs:"stretch", sm:"center"},
gap:2
}}
>

<Typography variant="h6" sx={{fontSize:{xs:"16px", sm:"18px"}}}>
Total: ₹{totalPrice}
</Typography>

<Button
variant="contained"
color="success"
size="large"
onClick={handlePayment}
sx={{
  width:{xs:"100%", sm:"auto"},
  fontSize:{xs:"14px", sm:"16px"}
}}
>
Pay ₹{totalPrice}
</Button>

</Box>

</>

)}

</div>

);

}

export default CustomerCart;