import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const BusinessInformation = ({ formData, handleInputChange }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create Your Account
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.fullName}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        name="email"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.password}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default BusinessInformation;
