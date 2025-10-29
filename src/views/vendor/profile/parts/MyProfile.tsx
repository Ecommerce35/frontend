import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/api';
import { SERVER_URL } from '../../../../api/constants';
// import AspectRatio from '@mui/material/AspectRatio';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'; // For Card overflow content, use CardContent instead of CardOverflow

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import Swal from 'sweetalert2'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';


import Select from '@mui/material/Select';
import { TextField } from '@mui/material';



export default function MyProfile() {
  const navigate = useNavigate()
 const [loading, setLoading] = useState(true);
  const [vendor_name, setVendorName] = useState('');
  const [address, setAddressLine] = useState('');
  const [about, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [profile_image, setProfileImage] = useState(null);
  const [cover_image, setCoverImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(''); // For preview URL
  const [coverImagePreview, setCoverImagePreview] = useState(''); // For preview URL
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  
  const API_KEY = 'pk.ac7f55c6c458a12ea5ed586db0b1bb4d'; // Replace with your LocationIQ API key
  // Handle input changes and fetch autocomplete suggestions
  const handleChangeInput = async (event) => {
    const value = event.target.value;
    setAddressLine(value);

    if (value.length > 2) {
      await fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: API_KEY,
          q: query,
          format: 'json',
        },
      });
      console.log(response.data)
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setAddressLine(suggestion.display_name); // Set input to selected suggestion
    setLatitude(suggestion.lat)
    setLongitude(suggestion.lon)
    setSuggestions([]); // Clear suggestions after selection
  };

  // Fetch initial profile data
  useEffect(() => {
    fetchVendorProfile();
  }, []);

  const fetchVendorProfile = async () => {
    try {
      const response = await api.get(`/vendor/about/`);
      const data = response.data;
      console.log(data);

      // Populate fields with the fetched data
      setVendorName(data.vendor_name || '');
      setAddressLine(data.address || '');
      setProfileImage(data.profile_image || '');
      setCoverImage(data.cover_image || '');
      setLatitude(data.latitude || '');
      setLongitude(data.longitude || '');
      setBio(data.about || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle profile image change and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file); // Save file for submission

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result); // Show preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover image change and preview
  const handleCoverImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(file); // Save file for submission

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result); // Show preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit profile updates to the backend
  const handleSubmit = async () => {
    // Prompt the user to confirm save action
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
  
        // Append text fields to FormData
        formData.append('vendor_name', vendor_name);
        formData.append('address', address);
        formData.append('about', about);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
  
        // Append file fields to FormData, if they exist
        if (profile_image instanceof File) formData.append('profile_image', profile_image);
        if (cover_image instanceof File) formData.append('cover_image', cover_image);
  
        // Configure API request with FormData
        try {
          const response = await api.put('/vendor/about/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          
          // Show success alert if API call succeeds
          Swal.fire("Saved!", "Your profile has been updated successfully.", "success");
          console.log('Profile updated successfully:', response.data);
          
        } catch (err) {
          // Handle API error response
          if (err.response) {
            console.error('Error response data:', err.response.data);
            Swal.fire("Error!", "There was an issue updating your profile.", "error");
          } else {
            console.error('Unexpected error:', err);
            Swal.fire("Error!", "An unexpected error occurred. Please try again.", "error");
          }
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  if (loading) {
    // Show skeletons while loading
    return (
      <Box sx={{ width: '100%', padding: 2 }}>
        {/* Banner Skeleton */}
        {/* Profile Image Skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Skeleton variant="circular" width={80} height={80} sx={{ marginRight: 2 }} />
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="text" width="60%" sx={{ marginBottom: 1 }} />
            <Skeleton variant="text" width="40%" />
          </Box>
        </Box>

        {/* Store Name Skeleton */}
        <Skeleton variant="text" width="80%" sx={{ marginBottom: 1 }} />

        {/* About Section Skeleton */}
        <Skeleton variant="rectangular" height={100} />
      </Box>
    );
  }

  if (!vendor_name) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', padding: 3 }}>
        <Typography variant="h6">Profile not available</Typography>
      </Box>
    );
  }
  


  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 2,
        }}
      >
        <Box sx={{ px: { xs: 1, md: 3 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Account
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              My profile
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 1, md: 2 },
          py: { xs: 2, md: 3 },
        }}
        >
        <Card sx={{ p: 2 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="title-md">Personal info</Typography>
            <Typography variant="body1">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />


            {/* Profile image */}
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
           >

            <Stack direction="column" spacing={1} alignItems="center">
            <Avatar
              src={profileImagePreview || `${SERVER_URL}${profile_image}`}
              alt="Profile Preview"
              sx={{
                width: 180, // Set the desired size (diameter) for the Avatar
                height: 180, // Matches width to keep it circular
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
                htmlFor="profile-image-upload"  // Link button to profile file input
                aria-label="Upload new picture"
                size="sm"
                variant="outlined"
                color="info"
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 460,
                  top: 350,
                  boxShadow: 'sm',
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>

            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Store Name</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input size="sm" value={vendor_name} onChange={(e) => setVendorName(e.target.value)} placeholder="Store name" required/>
                </FormControl>
                  <Input size="sm" sx={{ display: 'none', mt: 2 }} value={latitude} onChange={(e) => setLatitude(e.target.value)} readOnly />
                  <Input size="sm" sx={{ display: 'none', mt: 2 }} value={longitude} onChange={(e) => setLongitude(e.target.value)} readOnly />
              </Stack>

               {/* cover image */}
                <Stack direction="column" spacing={1} alignItems="center">
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '25%', // 4:1 aspect ratio (height = 25% of the width)
                    maxHeight: 200,
                    borderRadius: '0%',
                    overflow: 'hidden', // Ensures the image doesn't overflow the container
                  }}
                  >
                  <img
                    src={coverImagePreview || `${SERVER_URL}${cover_image}`}
                    alt="Profile Preview"
                    loading="lazy"
                    style={{
                      position: 'absolute', // Position the image inside the box
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // Ensures the image covers the entire area without distortion
                      borderRadius: '0%', // No border radius applied
                    }}
                  />
                </Box>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImage}
                    style={{ display: 'none' }}
                    id="cover-image-upload"  // Unique ID for cover image
                  />

                  <IconButton
                    component="label"
                    htmlFor="cover-image-upload"  // Link button to cover file input
                    aria-label="Upload new cover picture"
                    size="sm"
                    variant="outlined"
                    color="info"
                    sx={{
                      bgcolor: 'background.body',
                      position: 'absolute',
                      zIndex: 1000,
                      borderRadius: '50%',
                      left: 950,
                      top: 360,
                      boxShadow: 'sm',
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <TextField size="sm" readOnly value="Seller/vendor" />
                </FormControl>
              </Stack>
              <div>
              </div>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Where's your store?</FormLabel>
                  <TextField size="lg" value={address} onChange={handleChangeInput} placeholder="AddressLine" sx={{ flexGrow: 1 }} required />
                </FormControl>
              </Stack>
             

              {suggestions.length > 0 && (
                <>
                  {suggestions.map((suggestion, index) => (
                    <div key={index}>
                      <Link onClick={() => handleSuggestionClick(suggestion)}>{suggestion.display_name}</Link>
                      <Divider />
                    </div>
                  ))}
                </>
              )}

              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Bio</Typography>
                <Typography level="body-sm">
                  Write a short introduction to be displayed on your profile
                </Typography>
              </Box>
              <Divider />
              <Stack spacing={2} sx={{ my: 1 }}>
                <TextareaAutosize
                  size="sm"
                  minRows={4}
                  sx={{ mt: 1.5 }}
                  value={about} onChange={(e) => setBio(e.target.value)} placeholder="About Store"
                />
              </Stack>
             
            </Stack>
          </Stack>

          

          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
            >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
              <Avatar
                  src={profileImagePreview || `${SERVER_URL}${profile_image}`}
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
                  aria-label="upload new picture"
                  component="label"
                  htmlFor="profile-image-upload"  // Link button to profile file input
                  size="md"
                  variant="outlined"
                  color="info"
                  sx={{
                    bgcolor: 'white',
                    position: 'absolute',
                    zIndex: 1000,
                    borderRadius: '50%',
                    left: 140,
                    top: 270,
                    boxShadow: 'md',
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>

              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Store Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" value={vendor_name} onChange={(e) => setVendorName(e.target.value)} placeholder="Store name" />
                </FormControl>
                  <Input size="sm" sx={{ display: 'none', mt: 2 }} value={latitude} onChange={(e) => setLatitude(e.target.value)} readOnly />
                  <Input size="sm" sx={{ display: 'none', mt: 2 }} value={longitude} onChange={(e) => setLongitude(e.target.value)} readOnly />
              </Stack>
            </Stack>

             {/* cover image */}
             <Stack direction="column" spacing={1} alignItems="center">
             <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '25%', // 4:1 aspect ratio (height = 25% of the width)
                  maxHeight: 200,
                  borderRadius: '0%',
                  overflow: 'hidden', // Ensures the image doesn't overflow the container
                }}
                >
                <img
                  src={coverImagePreview || `${SERVER_URL}${cover_image}`}
                  alt="Profile Preview"
                  loading="lazy"
                  style={{
                    position: 'absolute', // Position the image inside the box
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ensures the image covers the entire area without distortion
                    borderRadius: '0%', // No border radius applied
                  }}
                />
              </Box>

              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImage}
                style={{ display: 'none' }}
                id="cover-image-upload"  // Unique ID for cover image
              />

              <IconButton
                component="label"
                htmlFor="cover-image-upload"  // Link button to cover file input
                aria-label="Upload new cover picture"
                size="sm"
                variant="outlined"
                color="info"
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 1000,
                  borderRadius: '50%',
                  left: 290,
                  top: 380,
                  boxShadow: 'sm',
                }}
              >
                <EditRoundedIcon />
              </IconButton>
              </Stack>

            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input size="sm" value="Vendor/Seller" readOnly />
            </FormControl>
            
            <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>AddressLine</FormLabel>
              <Input size="sm" value={address} onChange={handleChangeInput} placeholder="AddressLine" sx={{ flexGrow: 1 }} />
            </FormControl>

            {suggestions.length > 0 && (
                <>
                  {suggestions.map((suggestion, index) => (
                    <div key={index}>
                      <Link onClick={() => handleSuggestionClick(suggestion)}>{suggestion.display_name}</Link>
                      <Divider />
                    </div>
                  ))}
                </>
            )}
            
            <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Bio</Typography>
            <Typography level="body-sm">
              Write a short introduction to be displayed on your Storefront
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <TextareaAutosize
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              value={about} onChange={(e) => setBio(e.target.value)} placeholder="About Store"
            />
          </Stack>
          </Stack>
          
          {/* <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}> */}
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" onClick={() => navigate(-1)}  variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button onClick={handleSubmit} size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          {/* </CardOverflow> */}
        </Card>

      </Stack>
    </Box>
  );
}