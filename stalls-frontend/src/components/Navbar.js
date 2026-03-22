import React from "react";

import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    role = payload.role;
  }

  return (
    <div style={{ marginBottom: "20px" }}>

      <Link to="/shop">Shop</Link>

      {"  |  "}

      {role === "CUSTOMER" && (
        <>
          <Link to="/cart">Cart</Link>
          {"  |  "}
          <Link to="/orders">Orders</Link>
        </>
      )}

      {role === "VENDOR" && (
        <>
          <Link to="/vendor">Dashboard</Link>
          {"  |  "}
          <Link to="/vendor-orders">Orders</Link>
          {"  |  "}
          <Link to="/vendor-revenue">Revenue Summery</Link>
        </>
      )}

      {"  |  "}
      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        Logout
      </button>

    </div>
  );
}

export default Navbar;