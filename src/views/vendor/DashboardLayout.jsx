// DashboardLayout.jsx
import React, { useEffect, useState } from 'react';
import CssBaseline  from '@mui/material/CssBaseline';
import Stack  from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppTheme from './shared-theme/AppTheme';
import AppNavbar from './parts/AppNavbar';
import Header from './parts/Header';
import SideMenu from './parts/SideMenu';
import api from '../../api/api';
import { SERVER_URL } from '../../api/constants';

const DashboardLayout = ({ children }) => {

    const [about, setAbout] = useState(null)


  useEffect(() => {
    const vendorAbout = async () => {
        try {
            const response = await api.get(`/vendor/about/`);
            const aboutData = response.data;
            setAbout(aboutData)
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };
    vendorAbout(); // Fetch product data to populate the form
  }, []);

 // Replace with your actual backend URL

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu about={about} />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : theme.palette.background.default,
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />

            {children}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default DashboardLayout;
