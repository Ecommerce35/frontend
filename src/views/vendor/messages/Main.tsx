import * as React from 'react';
import MyMessages from './parts/MyMessages';
import DashboardLayout from '../DashboardLayout';
import Box from '@mui/material/Box';

export default function VendorMessage() {
  return (
    <DashboardLayout>
        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          <MyMessages />
        </Box>
    </DashboardLayout>
        
  );
}