import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  Button,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import api from '../../../../api/api';
import Swal from 'sweetalert2';


const PaymentForm = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        paymentMethod: "momo",
        momoNumber: "",
        momoProvider: "",
        bankName: "",
        bankAccountName: "",
        bankAccountNumber: "",
        bankRoutingNumber: "",
    });

    const fetchPaymentDetail = async () => {
      try {
        const response = await api.get(`/vendor/payment-method/`);
        const data = response.data
        console.log(data)
        setFormData({
          paymentMethod: data.payment_method && data.payment_method !== 'null' ? data.payment_method : '',
          momoNumber: data.momo_number && data.momo_number !== 'null' ? data.momo_number : '',
          momoProvider: data.momo_provider && data.momo_provider !== 'null' ? data.momo_provider : '',
          bankName: data.bank_name && data.bank_name !== 'null' ? data.bank_name : '',
          bankAccountName: data.bank_account_name && data.bank_account_name !== 'null' ? data.bank_account_name : '',
          bankAccountNumber: data.bank_account_number && data.bank_account_number !== 'null' ? data.bank_account_number : '',
          bankRoutingNumber: data.bank_routing_number && data.bank_routing_number !== 'null' ? data.bank_routing_number : '',
        });
      } catch (error) {
        console.error('Error fetching order details', error);
      } finally {
        setLoading(false);
      }
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      const isValid = validateStep();  // Check validation
      if (!isValid) {
          // If validation fails, show a message or focus on the first error field
          Swal.fire({
              title: 'Error!',
              text: 'Please correct the errors before submitting.',
              icon: 'error',
              confirmButtonText: 'OK',
          });
          return;  // Prevent form submission if validation fails
      }
    
      // Confirmation Alert
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update your payment details?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
      });
    
      if (confirmResult.isConfirmed) {
        const paymentData = new FormData();
        paymentData.append('payment_method', formData.paymentMethod);
        paymentData.append('momo_number', formData.momoNumber);
        paymentData.append('momo_provider', formData.momoProvider);
        paymentData.append('bank_name', formData.bankName);
        paymentData.append('bank_account_name', formData.bankAccountName);
        paymentData.append('bank_account_number', formData.bankAccountNumber);
        paymentData.append('bank_routing_number', formData.bankRoutingNumber);
    
        try {
          const response = await api.put(`/vendor/payment-method/`, paymentData);
          const data = response.data;
    
          // Success Alert
          await Swal.fire({
            title: 'Updated!',
            text: 'Your payment details have been successfully updated.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
    
        } catch (error) {
          console.error('Error updating payment details:', error);
    
          // Error Alert
          await Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while updating your payment details. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    };
  
    useEffect(() => {
      fetchPaymentDetail();
    }, []);

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    const validateStep = () => {
        const newErrors = {};
        if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required";
        if (formData.paymentMethod === "momo" && !formData.momoNumber) {
            newErrors.momoNumber = "Mobile Money Number is required";
        }
        if (formData.paymentMethod === "momo" && !formData.momoProvider) {
            newErrors.momoProvider = "Mobile Money provider is required eg. MTN, GLO";
        }
        if (formData.paymentMethod === "bank" && !formData.bankAccountNumber) {
            newErrors.bankAccountNumber = "Bank Account Number is required";
        }
        if (formData.paymentMethod === "bank" && !formData.bankName) {
            newErrors.bankName = "Bank Account Name is required";
        }
        if (formData.paymentMethod === "bank" && !formData.bankAccountName) {
            newErrors.bankAccountName = "Bank Account Name is required";
        }
    
        setErrors(newErrors); // Update error state
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };



  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Set Up Your Payment Method
      </Typography>
      <Box sx={{ width: '100%', margin: "0 auto", padding: 4 }}>
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
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disabled={loading}
            >
            {loading ? <CircularProgress size={24} /> : 'Update'}
          </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;
