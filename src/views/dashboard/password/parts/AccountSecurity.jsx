import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  IconButton, 
  InputAdornment,
} from '@mui/material';
import api from '../../../../api/api';
import Swal from 'sweetalert2';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const AccountSecurity = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length > 8;
    
        if (!hasUppercase) return "Password must include at least one uppercase letter.";
        if (!hasLowercase) return "Password must include at least one lowercase letter.";
        if (!hasNumber) return "Password must include at least one number.";
        if (!hasSpecialChar) return "Password must include at least one special character.";
        if (!isLongEnough) return "Password must be more than 8 characters.";
        
        return true;
      };

    const onSubmit = async (data) => {
        setMessage(null);
        setError(null);
        setLoading(true);
    
        try {
          const response = await api.post('/api/v1/auth/user/change-password/', data);
          setMessage(response.data.message);
          reset();
          Swal.fire({
            title: 'Success!',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } catch (err) {
          setError(err.response?.data || 'An unexpected error occurred.');
          const errorMessage = err.response?.data || 'An unexpected error occurred.';
            Swal.fire({
                title: 'Error!',
                text: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
                icon: 'error',
                confirmButtonText: 'Try Again',
            })
        } finally {
            setLoading(false);
        }
    };


  return (
    <Box sx={{ width: '100%' }}
        >
        <Typography fontWeight='bold' m={3} variant="h5" textAlign="center" gutterBottom>
            Change Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
            {/* Old Password */}
            <TextField
                label="Old Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...register('old_password', { required: 'Old password is required' })}
                error={!!errors.old_password}
                helperText={errors.old_password?.message}
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

            {/* New Password */}
            <TextField
                label="New Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...register('new_password', {
                required: 'New password is required',
                validate: validatePassword,
                })}
                error={!!errors.new_password}
                helperText={errors.new_password?.message}
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

            {/* Confirm New Password */}
            <TextField
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...register('confirm_new_password', {
                required: 'Please confirm your new password',
                validate: (value) => value === watch('new_password') || 'Passwords do not match',
                })}
                error={!!errors.confirm_new_password}
                helperText={errors.confirm_new_password?.message}
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

            {/* Submit Button */}
            <Button type="submit" variant="contained" disabled={loading} color="primary" fullWidth>
                {loading ? <CircularProgress size={22} /> : 'Change Password'}
            </Button>
            </Stack>
        </form>

        {/* Success Message */}
        {message && (
            <Alert severity="success" sx={{ mt: 3 }}>
            {message}
            </Alert>
        )}

        {/* Error Message */}
        {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
            {typeof error === 'string' ? error : JSON.stringify(error)}
            </Alert>
        )}
    </Box>
  )
}

export default AccountSecurity
