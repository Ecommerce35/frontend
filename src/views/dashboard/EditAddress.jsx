import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import AddressForm from './AddressForm';
import MapModal from './MapModal';
import api from '../../api/api'; // Adjust import path as necessary
import { useNavigate, useParams } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
import Grid from "@mui/material/Grid";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EditAddress = () => {
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
  const { id } = useParams(); // Get address ID from URL

  // Fetch the existing address details to populate the form
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.get(`/api/addresses/${id}/`);
        if (response.status === 200) {
          setFormData(response.data); // Populate form data with existing address
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        alert('Failed to load address. Please try again.');
      }
    };

    if (id) {
      fetchAddress(); // Fetch data only if there's an ID (editing mode)
    }
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submit (for editing address)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/api/addresses/${id}/`, formData); // PUT request for updating the address

      if (response.status === 200) {
        alert('Address updated successfully!');
        navigate('/user/dashboard/address/'); // Navigate back to address list
      }
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Failed to update address. Please try again.');
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
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom align="center">
              Edit Address
            </Typography>
            
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Full Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Mobile */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Country */}
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

              {/* Region */}
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

              {/* Town */}
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

              {/* GPS Address */}
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

              {/* Make Default */}
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

              {/* Submit Button */}
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
      </div>
      <Footer />
    </>
  );
};

export default EditAddress;
