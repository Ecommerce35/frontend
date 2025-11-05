import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../api/api';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
    Card,
    CardMedia,
} from '@mui/material';

import Grid from "@mui/material/Grid";


const ForgotPassword = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const Alert = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/api/v1/auth/password-reset/', { email: emailOrPhone });

            if (response.data.error) {
                setError('No account found with this email or phone number.');
                Alert('error', 'No account found', 'No account found with this email or phone number.');
            } else {
                navigate('/auth/change/password');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
            Alert('error', 'Oops...', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4} alignItems="center">
                {/* Form Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card elevation={-2} sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom textAlign="center">
                            Password Assistance
                        </Typography>
                        <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ mb: 2 }}>
                            Enter the email or phone number associated with your account
                        </Typography>
                        {error && (
                            <Typography variant="body2" color="error" textAlign="center" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                required
                                sx={{ mb: 3 }}
                            />
                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                <Link to="/auth/email" style={{ textDecoration: 'none' }}>
                                    <Typography variant="body2" color="primary">
                                        Remember password?
                                    </Typography>
                                </Link>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Continue'}
                                </Button>
                            </Box>
                        </form>
                    </Card>
                </Grid>

                {/* Image Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card elevation={0} sx={{ height: '100%' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                            alt="Password Assistance"
                            sx={{ borderRadius: 0, height: '100%' }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ForgotPassword;
