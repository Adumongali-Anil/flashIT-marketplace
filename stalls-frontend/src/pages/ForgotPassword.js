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

function ForgotPassword() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    otp: "",
    password: ""
  });

  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      const res = await api.post("/api/auth/forgot-password/send-otp", {
        email: data.email
      });

      alert(res.data.message);
      setOtpSent(true);

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const resetPassword = async () => {
    try {
      const res = await api.post("/api/auth/forgot-password/reset", data);

      alert(res.data.message);
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)"
      }}
    >

      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: { xs: "90%", sm: 400 },
          borderRadius: "20px"
        }}
      >

        <Typography
          variant="h5"
          textAlign="center"
          mb={2}
          fontWeight="bold"
        >
          Forgot Password
        </Typography>

        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <Button fullWidth variant="outlined" onClick={sendOtp}>
          Send OTP
        </Button>

        {otpSent && (
          <>
            <TextField
              label="Enter OTP"
              fullWidth
              sx={{ mt: 2 }}
              value={data.otp}
              onChange={(e) =>
                setData({ ...data, otp: e.target.value })
              }
            />

            <TextField
              label="New Password"
              type="password"
              fullWidth
              sx={{ mt: 2 }}
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={resetPassword}
            >
              Reset Password
            </Button>
          </>
        )}

        <Typography textAlign="center" mt={2}>
          <span
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "bold"
            }}
            onClick={() => navigate("/")}
          >
            Back to Login
          </span>
        </Typography>

      </Paper>

    </Box>
  );
}

export default ForgotPassword;