import React,{useEffect,useState} from "react";
import api from "../services/api";

function CustomerOrders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{
loadOrders();
},[]);

const loadOrders = async ()=>{

const res = await api.get("/api/orders/my-orders");

setOrders(res.data);

};

return(

<div style={{padding:"20px"}}>

<h2>My Orders</h2>

{orders.map(order=>(

<div key={order.id} style={{marginBottom:"40px"}}>

<h3>
Order #{order.id}
</h3>

<p style={{color:"gray"}}>
{new Date(order.orderDate).toLocaleString()}
</p>

{/* GRID SAME AS SHOP */}

<div
style={{
display:"flex",
flexWrap:"wrap",
gap:"25px"
}}
>

{order.items.map(item=>(

<div
key={item.id}
style={{
width:"260px",
borderRadius:"18px",
overflow:"hidden",
background:"white",
boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
transition:"0.3s"
}}
>

<img
src={`https://flashit-marketplace.onrender.com/uploads/${item.product.imageUrl}`}
alt=""
style={{
width:"100%",
height:"180px",
objectFit:"cover"
}}
/>

<div style={{padding:"15px"}}>

<h3>{item.product.name}</h3>

<p>
Quantity: {item.quantity}
</p>

<h4 style={{color:"red"}}>
₹{item.price}
</h4>

</div>

</div>

))}

</div>

</div>

))}

</div>

);

}

export default CustomerOrders;