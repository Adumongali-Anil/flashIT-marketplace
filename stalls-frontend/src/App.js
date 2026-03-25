import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* PAGES */
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectRole from "./pages/SelectRole";
import ForgotPassword from "./pages/ForgotPassword";

/* CUSTOMER */
import CustomerShop from "./pages/CustomerShop";
import CustomerCart from "./pages/CustomerCart";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerLayout from "./components/CustomerLayout";
import CustomerStalls from "./pages/CustomerStalls";
import CustomerStallProducts from "./pages/CustomerStallProducts";
import ProductDetails from "./pages/ProductDetails";

/* ADMIN */
import Layout from "./components/Layout";
import AdminHome from "./pages/AdminHome";
import AdminUsers from "./pages/AdminUsers";
import AdminVendors from "./pages/AdminVendors";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminRevenue from "./pages/AdminRevenue";
import AdminStalls from "./pages/AdminStalls";

/* VENDOR */
import VendorLayout from "./components/VendorLayout";
import VendorDashboardHome from "./pages/VendorDashboardHome";
import VendorStalls from "./pages/VendorStalls";
import VendorProducts from "./pages/VendorProducts";
import VendorOrders from "./pages/VendorOrders";
import VendorRevenue from "./pages/VendorRevenue";
import VendorAddProduct from "./pages/VendorAddProduct";
import VendorEditProduct from "./pages/VendorEditProduct";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* CUSTOMER (PROTECTED) */}
        <Route
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/shop" element={<CustomerShop />} />
          <Route path="/stalls" element={<CustomerStalls />} />
          <Route path="/stall/:id" element={<CustomerStallProducts />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/cart" element={<CustomerCart />} />
        </Route>

        {/* PRODUCT DETAILS (PROTECTED FOR ALL LOGGED USERS) */}
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="revenue" element={<AdminRevenue />} />
          <Route path="stalls" element={<AdminStalls />} />
        </Route>

        {/* VENDOR */}
        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<VendorDashboardHome />} />
          <Route path="stalls" element={<VendorStalls />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="products/add" element={<VendorAddProduct />} />
          <Route path="products/edit/:id" element={<VendorEditProduct />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="revenue" element={<VendorRevenue />} />
        </Route>

      </Routes>

    </Router>
  );
}

export default App;