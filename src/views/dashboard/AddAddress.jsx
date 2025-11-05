import React, { useState } from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import AddressForm from './AddressForm';
import MapModal from './MapModal';
import api from '../../api/api'; // Adjust import path as necessary
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AddAddress = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
    address: '',
    country: '',
    region: '',
    town: '',
    gps_address: '',
    status: false, // For default status
  });
  const [open, setOpen] = useState(false); // Manage modal open state
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submit (for adding address only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/v1/address/addresses/', formData); // Always POST to add new address

      if (response.status === 201) {
        alert('Address added successfully!');
        navigate('/user/dashboard/address/');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to add address. Please try again.');
    }
  };

  // Modal controls
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header />
      <div className="container">
        <MapModal open={open} handleClose={handleClose} />
        <Grid sx={{ padding: '1rem' }} container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom align="center">
              Add a New Address
            </Typography>
            <Box
              align="center"
              sx={{
                border: '1px solid #B2BEB5',
                padding: '1rem',
                margin: '2rem',
                borderRadius: '5px',
                bgcolor: '#B2BEB5',
                xs: 12,
                md: 6,
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
              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Town"
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              {formData.country === 'Ghana' || 'ghana'? (
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
              ):
              (
                <></>
              )}

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
                  Add Address
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
