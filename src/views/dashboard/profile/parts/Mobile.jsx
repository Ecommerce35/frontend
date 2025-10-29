import React, { useState } from 'react';
import { Stack, TextField, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CallIcon from '@mui/icons-material/Call';
import WcIcon from '@mui/icons-material/Wc';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import RoomIcon from '@mui/icons-material/Room';

const MobileProfile = () => {
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    

    return (
        <Stack direction="column" spacing={2} sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}>
            <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1}>
                    <div
                        style={{
                            width: 108,
                            height: 108,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <IconButton
                            aria-label="upload new picture"
                            sx={{
                                position: 'absolute',
                                left: 85,
                                top: 70,
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                borderRadius: '50%',
                                boxShadow: 3,
                            }}
                        >
                            <EditRoundedIcon />
                        </IconButton>
                    </div>
                </Stack>
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <InputLabel htmlFor="first-name">Name</InputLabel>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            size="small"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            size="small"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Stack>
                </Stack>
            </Stack>
            <FormControl fullWidth>
                <InputLabel htmlFor="role">Role</InputLabel>
                <TextField
                    id="role"
                    label="Role"
                    variant="outlined"
                    size="small"
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="mobile">Mobile</InputLabel>
                <TextField
                    id="mobile"
                    label="Mobile"
                    variant="outlined"
                    size="small"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    InputProps={{
                        startAdornment: <CallIcon sx={{ mr: 1 }} />,
                    }}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    startAdornment={<WcIcon sx={{ mr: 1 }} />}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: <EmailRoundedIcon sx={{ mr: 1 }} />,
                    }}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="address">Address</InputLabel>
                <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    size="small"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    InputProps={{
                        startAdornment: <RoomIcon sx={{ mr: 1 }} />,
                    }}
                />
            </FormControl>
        </Stack>
    );
};

export default MobileProfile;
