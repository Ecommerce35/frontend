import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid2 from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { useAuthStore } from '../../api/authStore';
import useUserData from '../../api/userData';
import { SERVER_URL } from '../../api/constants';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PasswordIcon from '@mui/icons-material/Password';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';




// Custom card style for hover effect
const cardStyle = {
  backgroundColor: 'white',
  
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
  padding: '1rem',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#fbfbfb',
  },
};

const UserDashboard = () => {
  const isAuthenticated = useAuthStore.getState().isLoggedIn();
  const { userData } = useUserData();
  console.log(userData);
  

  return (
    <>
    <Header />
    <div className='container'>
      <Box sx={{ padding: '0.5rem' }}>
        <Typography fontWeight='bold' m={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} variant="h5" gutterBottom>
          Account
        </Typography>
        <Grid2 sx={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', display: 'grid',gap: '1rem',padding: '1rem',}} container spacing={2}>
          {/* Profile Management */}
          <Grid2 item xs={12} sm={6} md={4} lg={3}>
            <Card sx={cardStyle}>
              <Link to="/user/dashboard/profile" color="textPrimary" underline="none">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>
                    <AccountCircleIcon fontSize='large'/>
                  </Avatar>
                    <Typography variant="h6">Profile Management</Typography>
                  </Box>
                  <Typography color="textSecondary">
                    Personal information section for updating name, email, and contact details
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          {/* Address Management */}
          <Grid2 item xs={12} sm={6} md={4} lg={3} >
            <Card sx={cardStyle}>
              <Link to={"/user/dashboard/address"} color="textPrimary" underline="none">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }} >
                      <ContactMailIcon fontSize='large' color='dark'/>
                    </Avatar>
                    <Typography variant="h6">Your addresses</Typography>
                  </Box>
                  <Typography color="textSecondary">Edit, remove or set default address</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          {/* Order History */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <Link to={"/user/dashboard/orders"} color="textPrimary" underline="none">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }} >
                      <ShoppingBasketIcon fontSize='large'/>
                    </Avatar>
                    <Typography variant="h6">Order History</Typography>
                  </Box>
                  <Typography color="textSecondary">
                    List of past orders with details (Order number, date, status, and total amount)
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          {/* Reviews */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <Link to={"/user/dashboard/reviews"} color="textPrimary" underline="none">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>
                    <ReviewsIcon />
                  </Avatar>
                    <Typography variant="h6">Reviews</Typography>
                  </Box>
                  <Typography color="textSecondary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          {/* Recently Viewed */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <Link to={"/user/dashboard/recently-viewed-products"} color="textPrimary" underline="none">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }} >
                      <ContactMailIcon fontSize='large'/>
                    </Avatar>
                    <Typography variant="h6">Recently viewed products</Typography>
                  </Box>
                  <Typography color="textSecondary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          {/* Account Security */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <Link to={"/user/dashboard/password-management"} color="textPrimary" underline="none">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }} >
                      <PasswordIcon fontSize='large'/>
                    </Avatar>
                    <Typography variant="h6">Account Security</Typography>
                  </Box>
                  <Typography color="textSecondary">
                    Edit login details, name, and mobile number.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          {/* Saved Products / Wishlist */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <Link href="/wishlist" color="textPrimary" underline="none">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }} >
                      <ContactMailIcon fontSize='large'/>
                    </Avatar>
                    <Typography variant="h6">Saved Products (Wishlist)</Typography>
                  </Box>
                  <Typography color="textSecondary">
                    Items you've added to your wishlist can be easily moved to your cart.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>

          {/* Logout */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={cardStyle}>
              <Link to={"/user/dashboard/sign-out"} color="textPrimary" underline="none">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }} >
                      <LogoutOutlinedIcon fontSize='large' />
                    </Avatar>
                    <Typography variant="h6">Logout</Typography>
                  </Box>
                  <Typography color="textSecondary">
                    Click here to log out of your account.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </div>
    <Footer />
    </>
  );
}

export default UserDashboard