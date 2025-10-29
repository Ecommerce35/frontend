import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../../api/api';
import { setAuthUser } from '../../api/auth';
import { useAuthStore } from '../../api/authStore';
import { syncCartAfterLogin } from '../../utils/CartFunctions';
import { useCart } from '../../utils/CartContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';


import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
  Card,
  CardContent,
  IconButton, 
  InputAdornment,
} from '@mui/material';

import Grid from '@mui/material/Grid2';

const PasswordForm = () => {
  const { refreshCart } = useCart();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setError: setAuthError } = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setPassword('');
  };

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectTo = decodeURIComponent(queryParams.get("next") || "/");

  useEffect(() => {
    const savedEmailOrPhone = localStorage.getItem('emailOrPhone');
    if (savedEmailOrPhone) {
      setEmailOrPhone(savedEmailOrPhone);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, status } = await api.post('/api/v1/auth/login/', {
        email,
        password,
      });

      if (status === 200) {
        setAuthUser(data.access_token, data.refresh_token);
        localStorage.removeItem('emailOrPhone');
        await syncCartAfterLogin();
        await refreshCart();
        navigate(redirectTo);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }} >
          <Card sx={{ boxShadow: 0 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom textAlign="center">
                Get Started Today!
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Typography variant="subtitle1" textAlign="center">
                {email}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} mt={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                  InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}

                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  <Typography variant="body2">
                    No account?{' '}
                    <Link to="/register/" style={{ textDecoration: 'none' }}>
                      Sign up
                    </Link>
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Continue'}
                  </Button>
                </Box>
              </Box>
              <Typography variant="body2" textAlign="center" mt={2}>
                <Link to="/auth/reset" style={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt="Password reset illustration"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 0,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PasswordForm;
