import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

function VendorDashboardHome() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    stalls: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });

  const [chartData, setChartData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const stallsRes =
        await api.get("/api/stalls/vendor/my-stalls");

      const productsRes =
        await api.get("/api/products/vendor/my-products");

      const stalls = stallsRes.data || [];
      const products = productsRes.data || [];

      setStats({
        stalls: stalls.length,
        products: products.length,
        orders: 12,
        revenue: 2450
      });

      setChartData([
        { day: "Mon", orders: 2, revenue: 200 },
        { day: "Tue", orders: 5, revenue: 600 },
        { day: "Wed", orders: 3, revenue: 300 },
        { day: "Thu", orders: 6, revenue: 900 },
        { day: "Fri", orders: 4, revenue: 450 }
      ]);

      setTopProducts(products.slice(0, 3));

    } catch (err) {

      console.error("Dashboard load error:", err);

      // Prevent crash
      setStats({
        stalls: 0,
        products: 0,
        orders: 0,
        revenue: 0
      });

      setTopProducts([]);

    }

  };

  const card = (title, value, color, route) => (
    <div
      onClick={() => navigate(route)}
      style={{
        flex: 1,
        padding: "30px",
        borderRadius: "18px",
        color: "#fff",
        background: color,
        cursor: "pointer",
        transition: "all 0.35s ease",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
      }}
      onMouseEnter={(e)=>{
        e.currentTarget.style.transform="translateY(-8px) scale(1.03)";
        e.currentTarget.style.boxShadow=
        "0 15px 35px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e)=>{
        e.currentTarget.style.transform="translateY(0)";
        e.currentTarget.style.boxShadow=
        "0 6px 20px rgba(0,0,0,0.15)";
      }}
    >
      <h4>{title}</h4>
      <h1>{value}</h1>
      <p>Live Data</p>
    </div>
  );

  return (
    <div style={{ padding: "30px" }}>

      <h2 style={{ marginBottom: "30px" }}>
        Vendor Overview
      </h2>

      {/* DASHBOARD CARDS */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "50px"
      }}>

        {card(
          "My Stalls",
          stats.stalls,
          "linear-gradient(45deg,#667eea,#764ba2)",
          "/vendor/stalls"
        )}

        {card(
          "Products",
          stats.products,
          "linear-gradient(45deg,#f7971e,#ffd200)",
          "/vendor/products"
        )}

        {card(
          "Orders",
          stats.orders,
          "linear-gradient(45deg,#43cea2,#185a9d)",
          "/vendor/orders"
        )}

        {card(
          "Revenue",
          `₹${stats.revenue}`,
          "linear-gradient(45deg,#ff512f,#dd2476)",
          "/vendor/revenue"
        )}

      </div>

      {/* CHART SECTION */}
      <div style={{
        display: "flex",
        gap: "40px",
        marginBottom: "50px"
      }}>

        <div style={{ flex: 1 }}>
          <h3>Revenue Analytics</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="day"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="revenue" fill="#8884d8"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Orders Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="day"/>
              <YAxis/>
              <Tooltip/>
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#ff7300"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* TOP PRODUCTS */}
      <div>

        <h3 style={{ marginBottom: "20px" }}>
          Top Selling Products
        </h3>

        <div style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>

          {topProducts.length === 0 ? (
            <p>No products yet</p>
          ) : (
            topProducts.map(p => (

              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #eee"
                }}
              >

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px"
                }}>

                  <img
                    src={`https://flashit-marketplace.onrender.com/uploads/${p.imageUrl}`}
                    width="50"
                    height="50"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover"
                    }}
                    alt=""
                  />

                  <span>{p.name}</span>

                </div>

                <span style={{ fontWeight: "bold" }}>
                  ₹{p.price}
                </span>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default VendorDashboardHome;