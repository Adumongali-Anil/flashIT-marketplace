import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAdd, onDelete, isVendor }) {

  const navigate = useNavigate();

  return (

    <div
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.35s ease",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        width: "250px"
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.25)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
      }}
    >

      {/* IMAGE */}
      <img
        src={
          product.imageUrl
            ? `https://flashit-marketplace.onrender.com/uploads/${product.imageUrl}`
            : "https://picsum.photos/400/200"
        }
        alt="product"
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

        {/* ================= ROLE BASED ================= */}

        {isVendor ? (

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

            {/* EDIT BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/vendor/products/edit/${product.id}`);
              }}
              style={{
                flex: 1,
                padding: "10px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              Edit ✏️
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
              style={{
                flex: 1,
                padding: "10px",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              Delete ❌
            </button>

          </div>

        ) : (

          <button
            onClick={(e) => {
              e.stopPropagation();
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
            Add to Cart 🛒
          </button>

        )}

      </div>

    </div>
  );
}

export default ProductCard;