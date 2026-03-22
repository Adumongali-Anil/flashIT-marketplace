import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper
} from "@mui/material";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await api.post("/api/auth/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

      if (res.data.role === "ADMIN")
        navigate("/admin");
      else if (res.data.role === "VENDOR")
        navigate("/vendor");
      else
        navigate("/shop");

    } catch (err) {
      alert("Login Failed");
    }
  };

  return (

    <Box sx={container}>

      <Paper className="login-card" sx={card}>

        <Typography variant="h5" textAlign="center" mb={3} fontWeight="bold">
          Marketplace Login
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>

          <TextField
            label="Username/Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <Typography textAlign="center" mt={1}>
            <span
              style={{ color: "#2563eb", cursor: "pointer" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </Typography>

          <Typography textAlign="center">
            Don't have account?{" "}
            <span
              style={registerText}
              onClick={() => navigate("/select-role")}
            >
              Register
            </span>
          </Typography>

        </Box>

      </Paper>

    </Box>
  );
}

/* STYLE */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#667eea,#764ba2)"
};

const card = {
  p: 4,
  width: 400,
  borderRadius: "16px"
};

const registerText = {
  color: "#38bdf8",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Login;