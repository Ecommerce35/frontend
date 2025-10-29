import React from 'react';
import { Typography } from '@mui/material';

const MaskEmail = ({ email }) => {
    // Function to mask the email
    const maskEmail = (email) => {
        const [username, domain] = email.split('@');
        const maskedUsername = username[0] + '*****'; // Mask the part of the username
        return `${maskedUsername}@${domain}`;
    };

    return (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            {maskEmail(email)}
        </Typography>
    );
};

export default MaskEmail;
