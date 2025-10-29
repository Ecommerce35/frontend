import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../../api/auth';
import { Container, Typography, Button, Box } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result.success) {
            navigate('/auth/email'); // Redirect to login or home page
        } else {
            alert(`Logout failed: ${result.message}`);
        }
    };

  return (
    <div>
      <LogoutOutlinedIcon
        sx={{ fontSize: 80, color: '#ff5252', marginBottom: 2 }}
      />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        Are you sure you want to logout?
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: '#666', marginBottom: 3, textAlign: 'center' }}
      >
        Logging out will end your current session, and you'll need to log in
        again to continue.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleLogout}
          sx={{ textTransform: 'none' }}
        >
          Yes, Logout
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate(-1)}
          sx={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
      </Box>
    </div>
  )
}

export default Logout
