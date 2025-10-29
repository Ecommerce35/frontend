import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu({ about }) {

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src={`${BASE_URL}${about?.profile_image}`}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: '16px' }}>
            {about?.vendor_name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {about?.vendor.email}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>

      {/* <Divider /> */}
      <MenuContent />
      {/* <CardAlert /> */}
      
    </Drawer>
  );
}