import React, { useEffect, useState } from "react";
import api from "../services/api";
// import Navbar from "../components/Navbar";

function VendorRevenue() {

  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const response = await api.get("/api/orders/vendor-revenue");
      setRevenue(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load revenue");
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <h2>Revenue Summary</h2>

      {revenue ? (
        <div
          style={{
            border: "2px solid green",
            padding: "20px",
            margin: "20px",
            backgroundColor: "#f0fff0"
          }}
        >
          <h3>Total Orders: {revenue.totalOrders}</h3>
          <h3>Total Products Sold: {revenue.totalProductsSold}</h3>
          <h2>Total Revenue: ₹{revenue.totalRevenue}</h2>
        </div>
      ) : (
        <p>Loading revenue...</p>
      )}
    </div>
  );
}

export default VendorRevenue;