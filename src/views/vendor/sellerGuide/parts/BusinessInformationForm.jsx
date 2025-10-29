import React from "react";
import { Box, Typography, TextField, MenuItem, Button, IconButton } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material"; // Import icons


const BusinessInformationForm = ({ formData, handleInputChange, handleFileChange, countryOptions, errors }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Enter Your Business Information
      </Typography>
      
      <TextField
        fullWidth
        label="Store Name"
        name="storeName"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.storeName}
        onChange={handleInputChange}
        error={!!errors.storeName} // Show error if storeName has one
        helperText={errors.storeName} // Display error message
      />
      
      <TextField
        fullWidth
        label="Business Email"
        name="businessEmail"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.businessEmail}
        onChange={handleInputChange}
        error={!!errors.businessEmail} // Show error if businessEmail has one
        helperText={errors.businessEmail} // Display error message
      />
      
      <TextField
        select
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.country} // Show error if country has one
        helperText={errors.country} // Display error message
      >
        {countryOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Vendor Type"
        name="vendorType"
        value={formData.vendorType}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.vendorType} // Show error if vendorType has one
        helperText={errors.vendorType} // Display error message
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="non_student">Non-Student</MenuItem>
      </TextField>

      {formData.vendorType === "student" ? (
        <label htmlFor="upload-student-id">
          <input
            id="upload-student-id"
            type="file"
            label="Upload Student ID"
            name="studentId"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span">
            Upload Student ID
          </Button>
          {formData.studentId ? (
            <IconButton color="success" sx={{ ml: 2 }}>
              <CheckCircle />
            </IconButton>
          ) : (
            <IconButton color="error" sx={{ ml: 2 }}>
              <Error />
            </IconButton>
          )}

        </label>
      ) : (
        <label htmlFor="upload-license">
          <input
            id="upload-license"
            type="file"
            style={{ display: "none" }} // Hide default file input
            name="license"
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span">
            Upload Business License
          </Button>

          {formData.license ? (
            <IconButton color="success" sx={{ ml: 2 }}>
              <CheckCircle />
            </IconButton>
          ) : (
            <IconButton color="error" sx={{ ml: 2 }}>
              <Error />
            </IconButton>
          )}

        </label>
      )}

      <TextField
        select
        label="Business Type"
        name="businessType"
        value={formData.businessType}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.businessType} // Show error if businessType has one
        helperText={errors.businessType} // Display error message
      >
        <MenuItem value="sole_proprietor">Sole Proprietor</MenuItem>
        <MenuItem value="partnership">Partnership</MenuItem>
        <MenuItem value="corporation">Corporation</MenuItem>
        <MenuItem value="llc">Limited Liability Company (LLC)</MenuItem>
        <MenuItem value="non_profit">Non-Profit</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
      
      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.phoneNumber}
        onChange={handleInputChange}
        error={!!errors.phoneNumber} // Show error if phoneNumber has one
        helperText={errors.phoneNumber} // Display error message
      />
      
      <TextField
        fullWidth
        label="Tax ID (Optional)"
        name="taxId"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.taxId}
        onChange={handleInputChange}
        error={!!errors.taxId} // Show error if taxId has one
        helperText={errors.taxId} // Display error message
      />
    </Box>
  );
};

export default BusinessInformationForm;
