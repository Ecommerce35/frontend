import * as React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation and Link for routing

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TimeIcon } from '@mui/x-date-pickers';
import AddCardIcon from '@mui/icons-material/AddCard';


const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, path: '/vendor' },
  { text: 'Orders', icon: <AssignmentRoundedIcon />, path: '/vendor/orders' },
  { text: 'Products', icon: <AnalyticsRoundedIcon />, path: '/vendor/products' },
  { text: 'Payment Method', icon: <AddCardIcon />, path: '/vendor/payment-method' },
  { text: 'Opening Hours', icon: <TimeIcon />, path: '/vendor/opening-hours' },
  { text: 'Profile', icon: <AccountCircleIcon />, path: '/vendor/profile' },
  { text: 'Reviews', icon: <ReviewsIcon />, path: '/vendor/reviews' },
];


const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const location = useLocation(); // Hook to get the current location
  const activePath = location.pathname;



  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton component={Link} to={`${item.path}`} selected={activePath === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
}