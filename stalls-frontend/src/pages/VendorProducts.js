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
            const res = await api.get("/api/products/vendor/my-products");
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

    /* ✅ DELETE */
    const handleDelete = async (id) => {

        if (!window.confirm("Delete Product?")) return;

        try {
            await api.delete(`/api/products/vendor/delete/${id}`);
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

    /* ✅ EDIT (NEW) */
    const handleEdit = (id) => {
        navigate(`/vendor/products/edit/${id}`);
    };

    return (
        <div style={{ padding: "10px" }}>

            <h2 className="responsive-h2">My Products</h2>

            {/* ADD PRODUCT BUTTON */}
            <button
                onClick={() => navigate("/vendor/products/add")}
                className="responsive-button"
                style={{
                    marginBottom: "20px"
                }}
            >
                ➕ Add Product
            </button>

            {/* PRODUCTS GRID - RESPONSIVE */}
            <div className="product-grid-mobile">

                {products.map(p => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        isVendor={true}
                        onDelete={handleDelete}
                        onEdit={handleEdit}   // ⭐ IMPORTANT FIX
                    />
                ))}

            </div>

            {/* ERROR */}
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