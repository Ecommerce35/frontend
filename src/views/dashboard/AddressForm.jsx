import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AddressForm = ({ addressData = {}, onSubmit, onChange, handleOpen }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    full_name: addressData?.full_name || '',
    mobile: addressData?.mobile || '',
    email: addressData?.email || '',
    address: addressData?.address || '',
    country: addressData?.country || '',
    region: addressData?.region || '',
    town: addressData?.town || '',
    gps_address: addressData?.gps_address || '',
    status: addressData?.status || false,
  });

  console.log(addressData);
  console.log(formData);
  

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Call the onChange callback if it's passed as a prop
    onChange && onChange({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <Grid sx={{ padding: '1rem' }} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom align="center">
          {addressData?.id ? 'Edit Address' : 'Add a New Address'}
        </Typography>
        <Box
          align="center"
          sx={{
            border: '1px solid #B2BEB5',
            padding: '1rem',
            margin: '2rem',
            borderRadius: '5px',
            bgcolor: '#B2BEB5',
          }}
        >
          <Typography variant="h5" color="white" sx={{ marginBottom: '1rem' }}>
            Save time. Fill your current location with just a click.
          </Typography>
          <Button onClick={handleOpen} variant="outlined" size="small" sx={{ marginBottom: '1rem' }}>
            Autofill
          </Button>
        </Box>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Town"
              name="town"
              value={formData.town}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="GPS"
              name="gps_address"
              value={formData.gps_address}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status}
                  onChange={handleChange}
                  name="status"
                  color="primary"
                />
              }
              label="Make this default"
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddressForm;
