import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressPage from './AddressPage';
import Info from './Info';
import InfoMobile from './InfoMobile';
import PaymentForm from './PaymentMethodPage';
import Review from './ReviewOrderPage';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // Import the CSS for the geocoder
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';
import PaystackPayment from './Paystack';
import api from '../../api/api';
import { useCart } from '../../utils/CartContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DeliveryMode from './DeliveryMode';
const steps = ['Shipping/Delivery address','Delivery mode', 'Payment details', 'Review your order'];

// Map URL parameter to step index
const stepToIndex = {
  address: 0,
  delivery: 1,
  payment: 2,
  review: 3
};

export default function Checkout() {
  const { cartCount, orderSummary, address } = useCart(); 


  function renderStepContent() {
    switch (currentStep) {
      case 'address':
        return <AddressPage />;
      case 'delivery':
        return <DeliveryMode />;
      case 'payment':
        return <PaymentForm />;
      case 'review':
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const API_KEY = 'pk.ac7f55c6c458a12ea5ed586db0b1bb4d'; // Replace with your LocationIQ API key

  const [email, setEmail] = useState(address);
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [addressesList, setAddressesList] = useState([]);

  const paymentType = localStorage.getItem('paymentType');

  const [searchParams, setSearchParams] = useSearchParams(); // Access URL params
  const navigate = useNavigate();
  const [showPaystack, setShowPaystack] = useState(false);
  
  // Determine the current step from the URL
  const currentStep = searchParams.get('step') || 'address'; // Default to 'address'
  const currentStepIndex = stepToIndex[currentStep];

  // Function to move to the next step
  // Function to move to the next step
const goToNextStep = () => {
  if (currentStep === 'address') {
    navigateToStep('delivery'); // Now 'delivery' comes after 'address'
  } else if (currentStep === 'delivery') {
    navigateToStep('payment');  // Now 'payment' comes after 'delivery'
  } else if (currentStep === 'payment') {
    navigateToStep('review');   // 'review' is the final step
  }
};

 // Function to move to the previous step
const goToPreviousStep = () => {
  if (currentStep === 'payment') {
    navigateToStep('delivery');  // Move back to 'delivery' from 'payment'
  } else if (currentStep === 'delivery') {
    navigateToStep('address');   // Move back to 'address' from 'delivery'
  } else if (currentStep === 'review') {
    navigateToStep('payment');   // Move back to 'payment' from 'review'
  }
};

  // Function to update URL with the new step
  const navigateToStep = (step) => {
    setSearchParams({ step }); // Update the URL parameter
  };

  // useEffect to default to the first step if no step is present in URL
  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: 'address' });
    }
  }, [searchParams, setSearchParams]);

  const handleCheckout = () => {
      if (paymentType === 'creditCard') {
          // Trigger Paystack payment flow
          setShowPaystack(true);
          // You may call an API or show the Paystack button based on your flow
      } else if (paymentType === 'paypal') {
          // Trigger PayPal payment flow (if implemented)
      } else if (paymentType === 'bank_transfer') {
          // Handle bank transfer
      } else {
          alert('Please select a valid payment method');
      }
  };

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/api/v1/address/addresses/');
      setAddressesList(response.data);
    } catch (error) {
      // setError('Unable to fetch addresses.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);


  return (
    <>
        <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              borderRight: { sm: 'none', md: '1px solid' },
              borderColor: { sm: 'none', md: 'divider' },
              alignItems: 'start',
              pt: 16,
              px: 10,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: 500,
              }}
            >
              <Info currentStep={currentStep} cartCount={cartCount} orderSummary={orderSummary} address={address}/>
            </Box>
          </Grid>

          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              width: '100%',
              backgroundColor: { xs: 'transparent', sm: 'background.default' },
              alignItems: 'start',
              pt: { xs: 6, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
            >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { sm: 'space-between', md: 'flex-end' },
                alignItems: 'center',
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={currentStepIndex}
                  sx={{ width: '100%', height: 40 }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected products
                  </Typography>
                  <Typography variant="body1">
                    {orderSummary.totalAmount.toFixed(2)}
                  </Typography>
                </div>
                <InfoMobile currentStep={currentStep} cartCount={cartCount} orderSummary={orderSummary} address={address}/>
              </CardContent>
            </Card>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
                maxHeight: '720px',
                gap: { xs: 5, md: 'none' },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={currentStepIndex}
                alternativeLabel
                // sx={{ display: { sm: 'flex', md: 'none' } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ':first-child': { pl: 0 },
                      ':last-child': { pr: 0 },
                      '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {currentStep === '' ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">Thank you for your order!</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Your order number is
                    <strong>&nbsp;#140396</strong>. We have emailed your order
                    confirmation and will update you once its shipped.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                  >
                    Go to my orders
                  </Button>
                </Stack>
              ) : (
                <React.Fragment>
                  {renderStepContent()}
                  <Box
                    sx={[
                      {
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', sm: 'row' },
                        alignItems: 'end',
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: '60px',
                      },
                      currentStep !== 'address'
                        ? { justifyContent: 'space-between' }
                        : { justifyContent: 'flex-end' },
                    ]}
                  >
                    {/* Previous Button */}
                    {currentStep !== 'address' && (
                      <>
                        <Button
                          startIcon={<ChevronLeftRoundedIcon />}
                          onClick={goToPreviousStep}
                          variant="text"
                          sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                          Previous
                        </Button>
                        <Button
                          startIcon={<ChevronLeftRoundedIcon />}
                          onClick={goToPreviousStep}
                          variant="outlined"
                          fullWidth
                          sx={{ display: { xs: 'flex', sm: 'none' } }}
                        >
                          Previous
                        </Button>
                      </>
                    )}

                    {/* Conditionally render Next or Place Order Button */}
                    {currentStep !== 'review' ? (
                      <Button
                        variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={goToNextStep}
                        sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                      >
                        Next
                      </Button>
                    ) : (
                      <>
                        {/* Render Paystack Payment Button when paymentType is creditCard */}
                        {showPaystack ? (
                          <PaystackPayment email={address.email} amount={orderSummary.grandTotal} />
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCheckout}
                            sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                          >
                            Place Order
                          </Button>
                        )}
                      </>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
    </>
   
  );
}