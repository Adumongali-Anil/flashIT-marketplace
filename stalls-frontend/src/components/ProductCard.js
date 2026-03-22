import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAdd }) {

  const navigate = useNavigate();

  return (

    <div

      /* ⭐ CLICK → GO TO DETAILS PAGE */
      onClick={() => navigate(`/product/${product.id}`)}

      style={{
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.35s ease",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)"
      }}

      /* ⭐ HOVER EFFECT BACK */
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-10px) scale(1.03)";
        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,0.25)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 20px rgba(0,0,0,0.12)";
      }}
    >

      {/* IMAGE */}
      <img
        src={
          product.imageUrl
            ? `http://localhost:8080/uploads/${product.imageUrl}`
            : "https://picsum.photos/400/200"
        }
        alt=""
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover"
        }}
      />

      {/* CONTENT */}
      <div style={{ padding: "15px" }}>

        <h3>{product.name}</h3>

        <p style={{ color: "gray" }}>
          {product.description}
        </p>

        <h3 style={{ color: "#ef4444" }}>
          ₹{product.price}
        </h3>

        {/* ⭐ ADD BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();   // ⭐ VERY IMPORTANT
            onAdd(product.id);
          }}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>

      </div>

    </div>

  );
}

export default ProductCard;