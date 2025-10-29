import * as React from 'react';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import MyProfile from './parts/MyProfile';

import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Create a theme using MUI's createTheme
const appTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  // Add more theme customizations as needed
});

export default function UserProfile() {
  return (
    <ThemeProvider theme={appTheme}>
      {/* CssBaseline ensures consistent baseline styling across the app */}
      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          component="main"
          sx={{
            pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            gap: 1,
            overflow: 'auto',
          }}
        >
          <MyProfile />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}