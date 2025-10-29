import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../../../../api/api';
import { SERVER_URL } from '../../../../api/constants';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  HomeRounded as HomeRoundedIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
  EmailRounded as EmailRoundedIcon,
  AccessTimeFilledRounded as AccessTimeFilledRoundedIcon,
  VideocamRounded as VideocamRoundedIcon,
  InsertDriveFileRounded as InsertDriveFileRoundedIcon,
  EditRounded as EditRoundedIcon,
  Room as RoomIcon,
  Call as CallIcon,
  Wc as WcIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import MobileProfile from './Mobile';
import Swal from 'sweetalert2';


const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    gender: "",
    mobile: "",
    profileImage: "",
    dateOfBirth: null,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/api/v1/auth/user/profile/`);
      const data = response.data;
      console.log(data);
      setFormData({
        email: data.email,
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        address: data.address || '',
        country: data.country || '',
        gender: data.gender || '',
        mobile: data.mobile || '',
        dateOfBirth: data.date_of_birth ? dayjs(data.date_of_birth) : dayjs(),
        profileImage: data.profile_image,
      })

    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update formData with the selected file
      setFormData((prev) => ({
        ...prev,
        profileImage: file, // Save the selected file for submission
      }));
  
      // Create a FileReader to show a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result); // Set preview image URL
      };
      reader.readAsDataURL(file); // Read the file as data URL for preview
    }
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ask for confirmation
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update your profile?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    });

    if (!confirmation.isConfirmed) {
      // If the user cancels the action, return early
      return;
    }

    setButtonLoading(true);

    try {
      // Create FormData object for file upload
      const formDataObject = new FormData();

      // Append user fields
      formDataObject.append('first_name', formData.firstName);
      formDataObject.append('last_name', formData.lastName);
      formDataObject.append('email', formData.email);

      // Append other profile fields
      formDataObject.append('address', formData.address);
      formDataObject.append('country', formData.country);
      formDataObject.append('gender', formData.gender);
      formDataObject.append('mobile', formData.mobile);
      formDataObject.append('date_of_birth', formData.dateOfBirth ? dayjs(formData.dateOfBirth).format('YYYY-MM-DD') : null);

      if (formData.profileImage instanceof File) {
        formDataObject.append('profile_image', formData.profileImage);
      }

      // Make the PUT request
      const response = await api.put('/api/v1/auth/user/profile/', formDataObject);

      // Show success message
      await Swal.fire({
        title: 'Updated!',
        text: 'Your profile has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      // Show error message
      await Swal.fire({
        title: 'Error!',
        text: error.response?.data?.detail || 'Failed to update profile. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });

      console.error('Error updating profile:', error.response?.data || error.message);
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    // Show skeletons while loading
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
      </Box>
    );
  }
    


  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Typography fontWeight='bold' m={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} variant="h5" gutterBottom>
        Manage profile
      </Typography>

      <Stack spacing={4} sx={{ maxWidth: "800px", mx: "auto", px: { xs: 2, md: 6 }, py: 2 }}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Typography variant="h6">Personal Info</Typography>
              <Typography variant="body2">
                Customize how your profile information will appear everywhere on the platform.
              </Typography>
            </CardContent>
            <Divider />
            <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ my: 2, px: {xs: 2} }}>
              <Stack direction="column" spacing={2} alignItems="center">

              <Avatar
                src={profileImagePreview || `${SERVER_URL}${formData.profileImage}`}
                alt="Profile Preview"
                sx={{
                  width: 120, // Set the desired size (diameter) for the Avatar
                  height: 120, // Matches width to keep it circular
                  borderRadius: '50%', // This is the default for Avatar, but you can specify it for clarity
                  objectFit: 'cover', // Ensures the image fills the Avatar without distortion
                }}
              />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="profile-image-upload"  // Unique ID for profile image
                />

                <IconButton
                  component="label"
                  size="large"
                  color="primary"
                  htmlFor="profile-image-upload"  // Link button to profile file input
                  sx={{
                    position: "relative",
                    top: -30,
                    zIndex: 2,
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>

              <Stack spacing={2} flexGrow={1}>
                <TextField
                  fullWidth
                  label="First Name"
                  placeholder="Enter first name"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  placeholder="Enter last name"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Email"

                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Mobile"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                    fullWidth
                    select
                    label="Gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                <TextField
                  fullWidth
                  label="Address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RoomIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Country"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlagIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={(newValue) => setFormData({ ...formData, dateOfBirth: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Stack>
            </Stack>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
              <Button component={Link} to={'/user/dashboard'} variant="outlined" color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={buttonLoading} color="primary">
                {buttonLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardActions>
          </Card>
        </form>
      </Stack>
    </Box>
  );
};

export default MyProfile;
