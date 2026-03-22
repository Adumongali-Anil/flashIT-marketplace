import React, { useEffect, useState } from "react";
import api from "../services/api";
// import Navbar from "../components/Navbar";

function VendorOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  const fetchVendorOrders = async () => {
    try {
      const response = await api.get("/api/orders/vendor-orders");
      setOrders(response.data);
    } catch {
      alert("Failed to load vendor orders");
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <h2>Vendor Orders</h2>

      {orders.length === 0 ? (
  <p>No orders yet</p>
) : (
  orders.map((item) => (
    <div
      key={item.id}
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px"
      }}
    >
      <p><b>Product:</b> {item.product?.name}</p>
      <p><b>Quantity:</b> {item.quantity}</p>
      <p><b>Price:</b> ₹{item.price}</p>
      <p><b>Total:</b> ₹{item.price * item.quantity}</p>
    </div>
  ))
)}
    </div>
  );
}

export default VendorOrders;