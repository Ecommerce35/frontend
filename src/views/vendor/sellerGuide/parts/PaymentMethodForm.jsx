import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from '@mui/material/Grid';

const PaymentMethodForm = ({ formData, handleInputChange, errors }) => {

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Set Up Your Payment Method
      </Typography>
      <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 4 }}>
        <TextField
          select
          label="Payment Method"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.paymentMethod} // Show error if paymentMethod has one
          helperText={errors.paymentMethod} // Display the error message
        >
          <MenuItem value="momo">Mobile Money</MenuItem>
          <MenuItem value="bank">Bank Transfer</MenuItem>
        </TextField>

        {/* Mobile Money Fields */}
        {formData.paymentMethod === "momo" && (
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Mobile Money Number"
                name="momoNumber"
                value={formData.momoNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.momoNumber} // Show error for momoNumber if any
                helperText={errors.momoNumber} // Display error message for momoNumber
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Momo Provider"
                name="momoProvider"
                value={formData.momoProvider}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.momoProvider} // Show error for momoProvider if any
                helperText={errors.momoProvider} // Display error message for momoProvider
              />
            </Grid>
          </Grid>
        )}

        {/* Bank Transfer Fields */}
        {formData.paymentMethod === "bank" && (
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.bankName} // Show error for bankName if any
                helperText={errors.bankName} // Display error message for bankName
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Account Name"
                name="bankAccountName"
                value={formData.bankAccountName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.bankAccountName} // Show error for bankAccountName if any
                helperText={errors.bankAccountName} // Display error message for bankAccountName
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Account Number"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.bankAccountNumber} // Show error for bankAccountNumber if any
                helperText={errors.bankAccountNumber} // Display error message for bankAccountNumber
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Routing Number (Optional)"
                name="bankRoutingNumber"
                value={formData.bankRoutingNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.bankRoutingNumber} // Show error for bankRoutingNumber if any
                helperText={errors.bankRoutingNumber} // Display error message for bankRoutingNumber
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default PaymentMethodForm;
