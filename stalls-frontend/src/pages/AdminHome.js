import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper
} from "@mui/material";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminHome() {

  const navigate = useNavigate();
  const [summary, setSummary] = useState({});

  const dark = localStorage.getItem("darkMode") === "true";

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    const res = await api.get("/api/admin/summary");
    setSummary(res.data);
  };

  /* ================= CARDS ================= */

  const cards = [
    {
      title: "Users",
      value: summary.totalUsers || 0,
      path: "/admin/users",
      color: "#667eea"
    },
    {
      title: "Vendors",
      value: summary.totalVendors || 0,
      path: "/admin/vendors",
      color: "#f7971e"
    },
    {
      title: "Stalls",
      value: summary.totalStalls || 0,
      path: "/admin/stalls",
      color: "#00c6ff"
    },
    {
      title: "Revenue",
      value: `₹${summary.totalRevenue || 0}`,
      path: "/admin/revenue",
      color: "#ff416c"
    }
  ];

  /* ================= DATA ================= */

  const analytics = [
    { name: "Users", value: summary.totalUsers || 0 },
    { name: "Vendors", value: summary.totalVendors || 0 },
    { name: "Stalls", value: summary.totalStalls || 0 },
    { name: "Orders", value: summary.totalOrders || 0 }
  ];

  const COLORS = ["#667eea", "#f7971e", "#00c6ff", "#38ef7d"];

  return (
    <Box>

      {/* TITLE */}
      <Typography
        variant="h5"
        mb={4}
        fontWeight="bold"
        color={dark ? "#fff" : "#000"}
      >
        Admin Dashboard
      </Typography>

      {/* ================= CARDS ================= */}

      <Grid container spacing={4}>

        {cards.map((card, i) => (

          <Grid item xs={12} md={3} key={i}>

            <Paper
              onClick={() => navigate(card.path)}
              sx={{
                p: 4,
                borderRadius: 4,
                color: "#fff",
                cursor: "pointer",

                /* ⭐ DARK MODE CARD */
                background: dark
                  ? "linear-gradient(135deg,#1e293b,#334155)"
                  : card.color,

                boxShadow: dark
                  ? "0 10px 30px rgba(0,0,0,0.6)"
                  : "0 10px 30px rgba(0,0,0,0.1)",

                transition: "0.4s",

                "&:hover": {
                  transform: "scale(1.05)"
                }
              }}
            >

              <Typography>
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                mt={2}
              >
                {card.value}
              </Typography>

            </Paper>

          </Grid>

        ))}

      </Grid>

      {/* ================= BAR CHART ================= */}

      <Paper
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 4,
          background: dark ? "#1e293b" : "#fff",
          color: dark ? "#fff" : "#000"
        }}
      >

        <Typography mb={2}>
          Platform Activity Overview
        </Typography>

        <ResponsiveContainer width="100%" height={350}>

          <BarChart data={analytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </Paper>

      {/* ================= LINE + PIE ================= */}

      <Grid container spacing={4} mt={4}>

        {/* LINE */}
        <Grid item xs={12} md={8}>

          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              background: dark ? "#1e293b" : "#fff",
              color: dark ? "#fff" : "#000"
            }}
          >

            <Typography mb={2}>
              Platform Growth Analytics
            </Typography>

            <ResponsiveContainer width="100%" height={350}>

              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </Paper>

        </Grid>

        {/* PIE */}
        <Grid item xs={12} md={4}>

          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              background: dark ? "#1e293b" : "#fff",
              color: dark ? "#fff" : "#000"
            }}
          >

            <Typography mb={2}>
              System Distribution
            </Typography>

            <ResponsiveContainer width="100%" height={350}>

              <PieChart>

                <Pie
                  data={analytics}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {analytics.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </Paper>

        </Grid>

      </Grid>

    </Box>
    
  );
}

export default AdminHome;