import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Button } from "@mui/material";
import Loader from "../components/Loader";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // ⭐ IMPORTANT

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchProduct();
}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProduct = async () => {

    try {
      const res = await api.get(`/api/products/${id}`);
      setProduct(res.data);

      // ✅ ONLY FOR CUSTOMER
      if (role === "CUSTOMER") {
        const cartRes = await api.get("/api/cart/my-cart");

        const item = cartRes.data.find(
          c => c.product.id === parseInt(id)
        );

        if (item) setQuantity(item.quantity);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CUSTOMER ONLY ================= */

  const increase = async () => {
    if (quantity >= product.stock) return;

    await api.post(`/api/cart/add/${id}?quantity=1`);
    setQuantity(q => q + 1);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const decrease = async () => {
    if (quantity === 0) return;

    await api.post(`/api/cart/add/${id}?quantity=-1`);
    setQuantity(q => q - 1);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (loading) return <Loader />;

  const remaining = product.stock - quantity;

  return (

    <div style={container}>

      <div style={card}>

        {/* IMAGE */}
        <img
          src={product.imageUrl}
          alt=""
          style={image}
          onMouseEnter={e => e.target.style.transform = "scale(1.2)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        />

        <div style={{ flex: 1 }}>

          <h1>{product.name}</h1>

          <p style={{ color: "gray" }}>
            {product.description}
          </p>

          <h2 style={{ color: "#ef4444" }}>
            ₹{product.price}
          </h2>

          {/* STOCK */}
          {product.stock === 0 ? (
            <p style={{ color: "red" }}>Out of Stock ❌</p>
          ) : (
            <p style={{ color: "green" }}>
              {product.stock} items available
            </p>
          )}

          {/* 🔥 ONLY CUSTOMER CAN SEE BELOW */}
          {role === "CUSTOMER" && (

            <>
              <p style={{ color: "green" }}>
                {remaining} left
              </p>

              <div style={qtyBox}>

                <Button onClick={decrease}>-</Button>

                <h3>{quantity}</h3>

                <Button onClick={increase}>+</Button>

              </div>

              <Button
                variant="contained"
                onClick={() => navigate("/cart")}
                style={{ marginTop: "20px" }}
              >
                Go to Cart 🛒
              </Button>

            </>
          )}

          {/* 🔥 VENDOR VIEW MESSAGE */}
          {role === "VENDOR" && (
            <p style={{ marginTop: "20px", color: "#64748b" }}>
              Vendor View (No cart actions)
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

/* STYLES */

const container = {
  padding: "40px",
  display: "flex",
  justifyContent: "center"
};

const card = {
  display: "flex",
  gap: "40px",
  background: "#fff",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
};

const image = {
  width: "400px",
  height: "300px",
  objectFit: "cover",
  borderRadius: "12px",
  transition: "0.4s"
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginTop: "15px"
};

export default ProductDetails;