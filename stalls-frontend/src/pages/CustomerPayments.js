import React from "react";
import api from "../services/api";
import {Button} from "@mui/material";

function CustomerPayments(){

const payNow = ()=>{

const options = {

key: "rzp_test_SKpsVSA2lU5EEg",

amount: 1000,

currency: "INR",

name: "Marketplace Shop",

description: "Test Payment",

handler: async function () {

await api.post("/api/orders/checkout");

alert("Payment Successful");

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

prefill:{
name:"Customer",
email:"test@test.com",
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

<div>

<h2>Payment</h2>

<Button
variant="contained"
color="success"
onClick={payNow}
>
Pay Now
</Button>

</div>

);

}

export default CustomerPayments;