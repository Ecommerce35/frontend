import React from "react";
import { Box, Typography, Button, TextField, Link, Divider } from "@mui/material";

const ProfileSetupForm = ({
  formData,
  handleInputChange,
  handleImageChange,
  errors,
  suggestions,
  handleSuggestionClick,
  handleChangeInput
}) => {
  return (
    <Box>
        <Box>
            <Typography variant='h4' sx={{ mb: 1 }}>Create Your Storefront</Typography>
        </Box>
      {/* Profile Image Upload */}
      <Typography sx={{ mb: 1 }}>Business Logo</Typography>
      {formData.profilePicture && (
        <img
          src={URL.createObjectURL(formData.profilePicture)} // Generate preview
          alt="Profile Preview"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            marginBottom: 10,
            border: "2px solid #ddd",
          }}
        />
      )}
      <Button variant="contained" component="label" size="small">
        Upload Business logo
        <input
          required
          type="file"
          accept="image/*"
          name="profilePicture"
          hidden
          onChange={handleImageChange} // Handle file selection
        />
      </Button>

      {/* Cover Image Upload */}
      <Typography sx={{ mt: 3, mb: 1 }}>Cover Image</Typography>
      {formData.coverImage && (
        <img
          src={URL.createObjectURL(formData.coverImage)} // Generate preview
          alt="Cover Preview"
          style={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            marginBottom: 10,
            border: "2px solid #ddd",
          }}
        />
      )}
      <Button sx={{ mb: 2 }} variant="contained" component="label" size="small">
        Upload Cover Image
        <input
          required
          type="file"
          accept="image/*"
          name="coverImage"
          hidden
          onChange={handleImageChange} // Handle file selection
        />
      </Button>

      {/* Business Address */}
      <TextField
        fullWidth
        label="Store Location"
        name="longitude"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.businessAddress}
        onChange={handleChangeInput}
        error={!!errors.businessAddress} // Show error if there is one
        helperText={errors.businessAddress} // Show error message
      />

      {/* Suggestions for Store Location */}
      <Box sx={{ maxHeight: 300, overflowY: "auto", backgroundColor: "background.paper", p: 1, borderRadius: 1 }}>
          {suggestions.map((suggestion, index) => (
              <React.Fragment key={index}>
              <Link 
                  onClick={() => handleSuggestionClick(suggestion)} 
                  sx={{ display: "block", p: 1, cursor: "pointer", color: "text.primary", ":hover": { color: "primary.main" } }}
              >
                  {suggestion.display_name}
              </Link>
              {index < suggestions.length - 1 && <Divider />}
              </React.Fragment>
          ))}
      </Box>

      {/* Longitude */}
      <TextField
        fullWidth
        label="Longitude"
        name="longitude"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.longitude}
        onChange={handleInputChange}
        InputProps={{
            readOnly: true,
        }}
        error={!!errors.longitude} // Show error if there is one
        helperText={errors.longitude} // Show error message
      />

      {/* Latitude */}
      <TextField
        fullWidth
        label="Latitude"
        name="latitude"
        variant="outlined"
        sx={{ mb: 2 }}
        value={formData.latitude}
        onChange={handleInputChange}
        InputProps={{
            readOnly: true,
        }}
        error={!!errors.latitude} // Show error if there is one
        helperText={errors.latitude} // Show error message
      />

      {/* About Section */}
      <Typography sx={{ mt: 3, mb: 1 }}>About</Typography>
      <TextField
        required
        name="about"
        label="Describe your business to customers"
        multiline
        rows={4}
        fullWidth
        value={formData.about}
        onChange={handleInputChange}
        error={!!errors.about} // Show error if there is one
        helperText={errors.about} // Show error message
      />
    </Box>
  );
};

export default ProfileSetupForm;
