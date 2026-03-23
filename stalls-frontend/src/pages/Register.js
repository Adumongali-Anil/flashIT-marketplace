import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "CUSTOMER";

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
    role: role
  });

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // PASSWORD CHECKS
  const passwordChecks = {
    length: user.password.length >= 8,
    upper: /[A-Z]/.test(user.password),
    lower: /[a-z]/.test(user.password),
    number: /\d/.test(user.password),
    special: /[@$!%*?&]/.test(user.password)
  };

  // TIMER
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // SEND OTP
  const sendOtp = async () => {

  console.log("Sending OTP...", user.email);

  if (!user.email || user.email.trim() === "") {
    alert("Enter valid email");
    return;
  }

  try {

    const res = await api.post("/api/auth/send-otp", {
      email: user.email.trim()
    });

    console.log("RESPONSE:", res.data);

    alert(res.data.message || "OTP sent");

    setOtpSent(true);
    setTimer(30);

  } catch (err) {

    console.log("ERROR:", err.response?.data || err);

    alert("OTP Failed");
  }
};

  // REGISTER
  const handleRegister = async () => {

    if (
      !passwordChecks.length ||
      !passwordChecks.upper ||
      !passwordChecks.lower ||
      !passwordChecks.number ||
      !passwordChecks.special
    ) {
      alert("Password does not meet requirements");
      return;
    }

    if (!user.otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await api.post("/api/auth/register", user);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
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
          width: { xs: "90%", sm: 420 },
          borderRadius: "20px"
        }}
      >

        <Typography
          variant="h5"
          textAlign="center"
          mb={2}
          fontWeight="bold"
          color="black"
        >
          Register as {role}
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>

          {/* Username */}
          <TextField
            label="Username"
            fullWidth
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />

          {/* Email */}
          <TextField
            label="Email"
            fullWidth
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          {/* Password with eye */}
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {/* PASSWORD CHECKS */}
          <Box fontSize="13px">

            <Typography color={passwordChecks.length ? "green" : "gray"}>
              {passwordChecks.length ? "✔" : "✖"} 8 characters
            </Typography>

            <Typography color={passwordChecks.upper ? "green" : "gray"}>
              {passwordChecks.upper ? "✔" : "✖"} uppercase letter
            </Typography>

            <Typography color={passwordChecks.lower ? "green" : "gray"}>
              {passwordChecks.lower ? "✔" : "✖"} lowercase letter
            </Typography>

            <Typography color={passwordChecks.number ? "green" : "gray"}>
              {passwordChecks.number ? "✔" : "✖"} number
            </Typography>

            <Typography color={passwordChecks.special ? "green" : "gray"}>
              {passwordChecks.special ? "✔" : "✖"} special symbol
            </Typography>

          </Box>

          {/* SEND OTP */}
          <Button
  variant="outlined"
  type="button"
  onClick={sendOtp}
>
            {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
          </Button>

          {/* OTP FIELD */}
          {otpSent && (
            <>
              <TextField
                label="Enter OTP"
                fullWidth
                value={user.otp}
                onChange={(e) =>
                  setUser({ ...user, otp: e.target.value })
                }
              />

              <Typography color="green" fontSize="13px">
                OTP has been sent to your email. Please check your inbox 📩
              </Typography>
            </>
          )}

          {/* REGISTER */}
          <Button
            variant="contained"
            size="large"
            onClick={handleRegister}
            sx={{ borderRadius: "10px", py: 1.2 }}
          >
            Register
          </Button>

          {/* LOGIN */}
          <Typography textAlign="center" color="black">
            Already have account?{" "}
            <span
              style={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </Typography>

        </Box>

      </Paper>

    </Box>
  );
}

export default Register;