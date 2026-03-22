import React, { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Snackbar, Alert } from "@mui/material";

function VendorProducts() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchProducts = useCallback(async () => {
        try {
            const res =
                await api.get("/api/products/vendor/my-products");
            setProducts(res.data);
        } catch (err) {
            const status = err?.response?.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/");
                return;
            }

            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null) ||
                err?.message ||
                "Failed to load products";

            setErrorMsg(msg);
            setErrorOpen(true);
        }
    }, [navigate]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Product?")) return;

        try {
            await api.delete(
                `/api/products/vendor/delete/${id}`
            );
            alert("Deleted ✅");
            fetchProducts();
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : null) ||
                err?.message ||
                "Failed to delete product";
            setErrorMsg(msg);
            setErrorOpen(true);
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>My Products</h2>

            {/* ADD PRODUCT BUTTON */}
            <button
                onClick={() =>
                    navigate("/vendor/products/add")
                }
                style={{
                    marginBottom: "20px",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                ➕ Add Product
            </button>

            {/* ✅ SWIGGY STYLE GRID */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "25px"
                }}
            >

                {products.map(p => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        isVendor={true}
                        onDelete={handleDelete}
                        onView={(id) => navigate(`/product/${id}`)}
                    />
                ))}

            </div>

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
                    sx={{ width: "100%" }}
                    onClose={() => setErrorOpen(false)}
                >
                    {errorMsg}
                </Alert>
            </Snackbar>

        </div>
    );
}

export default VendorProducts;