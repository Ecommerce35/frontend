import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../api/api';
import { Box, Button, TextField, Typography, Divider, CircularProgress, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

const LoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectTo = decodeURIComponent(queryParams.get("next") || "/");

  const resetForm = () => {
    setEmailOrPhone('');
  };

  const Alert = (icon, title, text) =>
    Swal.fire({
      icon,
      title,
      text,
    });

  const handleGoogleLogin = async () => {
    try {
      const response = await api.post('/api/v1/auth/google/');
      console.log('Google login response:', response);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/check-email-phone/', { email: emailOrPhone });
      if (response) {
        localStorage.setItem('emailOrPhone', emailOrPhone);
        navigate(`/auth/password?next=${redirectTo}`);
      }
      setError('No account found with this email or phone number.');
    } catch (error) {
      resetForm();
      setError('No account found with this email or phone number.');
      Alert('error', 'No account found', 'Please check your email or phone and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh', py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid size={{ xs:12, md: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Get started today!
            </Typography>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              <Link to="/auth/reset" style={{ textDecoration: 'underline' }}>
                Forgot password?
              </Link>
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              sx={{ fontSize: 'sm', alignSelf: 'center', display: 'flex', alignItems: 'center' }}
              >
              Don&apos;t have an account?{' '}
              <Link to="/register" style={{ marginLeft: '5px' }}>
                Sign up
              </Link>
            </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              height: '100%',
              borderRadius: 0,
              overflow: 'hidden',
            }}
          >
            <img
              alt="Login Visual"
              src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
