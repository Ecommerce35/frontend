import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import MaskEmail from './MaskEmail';
import api from '../../api/api';

const OtpVerification = () => {
    const navigate = useNavigate()
    const [typedOtp, setTypedOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(300); // Timer for resend OTP
    const [canResend, setCanResend] = useState(false);
    const [email, setEmail] = useState('');

  
    const Alert = (icon, title, text) => Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });

    // Automatically join typed OTP into a single string when changed
    useEffect(() => {
        const userEmail = localStorage.getItem('user_email');
        setEmail(userEmail);
    }, []);

    // Handle OTP change
    const handleChange = (e) => {
        const value = e.target.value;
        if (isNaN(value)) return; // Ensure only numbers are entered
        if (value.length <= 6) {
            setTypedOtp(value);
        }
    };

    const handleSubmit = async () => {
        if (typedOtp.length !== 6) {
            setError("Please enter a valid OTP.");
            return;
        }
        if (!email) {
            setError("Please enter a valid OTP.");
            return;
        }
    
        setLoading(true);
        setError(''); // Clear previous errors
        
        try {
            // Sending OTP and email to the backend
            const response = await api.post('/api/v1/auth/verify/', {
                email: email,
                otp: typedOtp
            });
    
            if (response.status === 200) {
                // On success
                Alert('success', 'OTP Verified', 'Your OTP has been successfully verified!');
                localStorage.removeItem('user_email');
                navigate('/auth/email');
            } else {
                // Handle backend validation errors
                const errorMessage = response.data.non_field_errors
                    ? response.data.non_field_errors[0] // Extracting the error message
                    : "OTP verification failed."; // Default message if no specific error message is found
                
                Alert('error', 'Verification Failed', errorMessage);
            }
        } catch (error) {
            // Handle network or unexpected errors
            Alert('error', 'Error', 'An error occurred. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };
    
    
    

      // Countdown timer logic
      useEffect(() => {
        if (timeLeft > 0 && !canResend) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1); // Decrease timeLeft by 1 every second
            }, 1000);

            return () => clearInterval(timer); // Clear the interval when component unmounts or timeLeft changes
        }

        // Enable resend after countdown reaches 0
        if (timeLeft === 0) {
            setCanResend(true);
        }
    }, [timeLeft, canResend]);

    const handleResend = async () => {
        if (!email) {
            Alert('error', 'Error', 'Email is required to resend OTP.');
            return;
        }
    
        try {
            setCanResend(false); // Disable the resend button
            setTimeLeft(300); // Reset the timer to 5 minutes
    
            // Send POST request to Resend OTP endpoint
            const response = await api.post('/api/v1/auth/resend-otp/', { email });
    
            if (response.status === 200) {
                Alert(
                    'info',
                    'OTP Sent',
                    'A new OTP has been sent to your email. It is valid for the next 5 minutes.'
                );
            } else if (response.data.message) {
                Alert('warning', 'Notice', response.data.message);
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            const errorMessage =
                error.response?.data?.error || 'An unexpected error occurred. Please try again.';
            Alert('error', 'Error', errorMessage);
        }
    };
    

    return (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Enter verification code
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        For your security, we’ve sent the code to your email address.
                    </Typography>
                    <MaskEmail email={email} />
                </div>
                <div className="max-w-md mx-auto mt-10">
                    <form onSubmit={(e) => e.preventDefault()} noValidate>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    value={typedOtp}
                                    onChange={handleChange}
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    size="large"
                                    maxLength="6"
                                    autoComplete="one-time-code"
                                    inputProps={{
                                        maxLength: 6,
                                        style: { textAlign: 'center', fontSize: '20px' },
                                    }}
                                    required
                                    inputMode="numeric"
                                    placeholder="Enter OTP"
                                />
                            </Grid>
                        </Grid>

                        {error && (
                            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <div className="flex items-center justify-center mt-4">
                            {loading ? (
                                <Button disabled fullWidth variant="contained" color="primary">
                                    Verifying...
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    fullWidth
                                    sx={{ backgroundColor: '', fontWeight: 'bold' }}
                                >
                                    Submit code
                                </Button>
                            )}
                        </div>
                    </form>
                    <div className="flex justify-center mt-4">
                        <Typography variant="body2" color="textSecondary">
                            {canResend ? (
                                <Link to="#" onClick={handleResend} className="text-blue-500">
                                    Resend code
                                </Link>
                            ) : (
                                 `OTP expires in ${formatTime(timeLeft)}`
                            )}
                        </Typography>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OtpVerification;
