import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import api from '../../api/api';
import { Link } from 'react-router-dom';

import { Container, Grid2, Icon } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShieldIcon from '@mui/icons-material/Shield';


const CheckoutPage = () => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
    const [delivery_options, setDeliveryOptions] = useState([]);
    const [totalPackagingFee, setTotalPackagingFee] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [subTotal, setSubtotal] = useState(0);
    const [deliveryDateRanges, setDeliveryDateRanges] = useState({});
    const [clippedCoupons, setClippedCoupons] = useState([]);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    console.log(delivery_options);

    const BASE_URL = " http://192.168.182.89:8000"; // Replace with your actual backend URL
// const BASE_URL = "http://127.0.0.1:8000"; // Replace with your actual backend URL

    const fetchCheckoutData = async () => {
        setLoading(true)
        try {
            const response = await api.get('/api/checkout/',);

            const data = response.data;
            console.log(data);
            
            setCartItems(data.cart_items);
            setTotalDeliveryFee(data.total_delivery_fee);
            setTotalPackagingFee(data.total_packaging_fee);
            setGrandTotal(data.grand_total);
            setDeliveryDateRanges(data.delivery_date_ranges);
            setClippedCoupons(data.clipped_coupons);
            setDeliveryOptions(data.product_delivery_options);
            setAppliedCoupon(data.applied_coupon);
            setDiscountAmount(data.discount_amount);
            setSubtotal(data.sub_total);
            setLoading(false)
        } catch (err) {
            console.error("Error fetching checkout data", err);
            setError(err.response?.data?.detail || "An error occurred while fetching the checkout data.");
        }

        setLoading(false)
    };

    useEffect(() => {
        fetchCheckoutData();
    }, []);

    // Function to call the backend API to update the delivery option
    const updateDeliveryOption = async (productId, deliveryOptionId) => {
        setLoading(true)
        try {
            const response = await api.post(
                '/api/update-delivery-option/', // API endpoint
                {
                    product_id: productId,
                    delivery_option_id: deliveryOptionId
                }
            );
            // Handle success
            console.log('Delivery option updated successfully', response.data);
            setDeliveryOptions(response.data.product_delivery_options);
            await fetchCheckoutData()
            setLoading(false)
        } catch (error) {
            // Handle error
            console.error('Error updating delivery option:', error.response ? error.response.data : error.message);
        }
        setLoading(false)
    };

    const handleOptionChange = (productId, deliveryOptionId) => {       
        updateDeliveryOption(productId, deliveryOptionId); // Call the API to update delivery option
    }

  return (
    <main>
         <Box sx={{ backgroundColor: '#f8f9fa', py: 2 }}>
            <Container>
                <Grid2 container alignItems="center" justifyContent="space-between">
                {/* Logo and Title */}
                <Grid2 item xs={12} sm={4} md={3}>
                    <Link to="/" underline="none">
                    <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
                        AdepaMarket
                    </Typography>
                    </Link>
                </Grid2>

                {/* Center Title */}
                <Grid2 item xs={12} sm={4} md={3}>
                    <Typography variant="h6" align="center">
                    Check delivery option
                    </Typography>
                </Grid2>

                {/* Right Side Icons */}
                <Grid2 sx={{ display: 'flex'}} item xs={12} sm={4} md={6}>
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 4 }
                    }}
                    >
                    {/* Help Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ mr: 1 }} />
                        <Box>
                            <Typography variant="body2">Need Help?</Typography>
                            <Typography variant="body2">
                                <Link href="#" color="primary" underline="hover">
                                    Contact Us
                                </Link>
                            </Typography>
                        </Box>
                    </Box>

                    {/* Easy Returns */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShoppingBagIcon sx={{ mr: 1 }} />
                        <Box>
                        <Typography variant="body2">Easy</Typography>
                        <Typography variant="body2">Returns</Typography>
                        </Box>
                    </Box>

                    {/* Secure Payment */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShieldIcon sx={{ mr: 1 }} />
                        <Box>
                        <Typography variant="body2">Secure</Typography>
                        <Typography variant="body2">Payment</Typography>
                        </Box>
                    </Box>
                    </Box>
                </Grid2>
                </Grid2>
            </Container>
        </Box>

        <div class="container mb-80 mt-50">
            <div className="row">
                <Box className='col-lg-8' display="flex" flexDirection="column" gap={3}>
                    {/* Delivery Details */}
                    <Card className="mb-30 mt-2">
                        <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" padding="15px">
                            <Typography variant="h6" className="text-uppercase fw-bold">
                            <i className="fas fa-check text-success"></i> Delivery Details
                            </Typography>
                            <Link to="#" className="text-primary font-xs">
                            Change <i className="fas fa-arrow-right"></i>
                            </Link>
                        </Box>
                        <Divider />
                        <Box px={3} py={1}>
                            <Typography variant="body1" className="d-flex justify-content-between align-items-center">
                            <span>Door Delivery</span>
                            <span className="text-warning">
                                <i className="fas fa-truck"></i>
                            </span>
                            </Typography>
                            <Typography variant="body2" className="text-muted font-xs">
                            Delivery between <span className="text-dark fw-bold"></span> and{' '}
                            <span className="text-dark fw-bold"></span>
                            </Typography>
                        </Box>

                        {/* Loop through shopcart items */}
                        <Box sx={{padding: 0, margin: 0}} className="row col-12 m-0">
                            {cartItems.map((c) => (
                            <Box sx={{padding: 0, margin: 0}} key={c.id}  className="col-lg-6">
                                <Card sx={{padding: 0, margin: 1}} className="border bg-white rounded-3">
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" padding="">
                                        <Typography variant="h6" className="fw-bold">
                                            Door Delivery
                                        </Typography>
                                        <Link to="#" className="text-primary font-xs">
                                            Change <i className="fas fa-arrow-right"></i>
                                        </Link>
                                        </Box>
                                        <Typography className="text-muted ml-10 font-xs">
                                            Delivery between  by {c.product.vendor.name}
                                        </Typography>
                                        <Divider />
                                        <Box padding="10px">
                                        <Box display="flex" alignItems="center">
                                            <Box className="product-thumbnail">
                                            <Link to={`/${c.product.slug}/${c.product.id}/${c.product.sub_category}`}>
                                                {c.product.variant !== 'None' ? (
                                                <img src={`${BASE_URL}${c.variant.image}`} width="50" alt="" />
                                                ) : (
                                                <img src={`${BASE_URL}${c.product.image}`} width="50" alt="" />
                                                )}
                                            </Link>
                                            </Box>
                                            <Box ml={2}>
                                            <Typography variant="body2" className="text-muted">
                                                {c.product.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                QTY: <span className="text-dark fw-bold">{c.quantity}</span>
                                            </Typography>
                                            </Box>
                                        </Box>

                                        <Typography variant="caption">Delivery options available:</Typography>

                                        {delivery_options[c.product.id]?.length > 0 && (
                                            <Box key={c.product.id}>
                                                <FormControl fullWidth>
                                                    <InputLabel id={`delivery-label-${c.product.id}`}>{delivery_options[c.product.id].find(option => option.default)?.delivery_option.name|| "Select Delivery Option"}</InputLabel>
                                                    <Select
                                                        labelId={`delivery-label-${c.product.id}`}
                                                        value={delivery_options[c.product.id].find(option => option.default)?.delivery_option.id || "Select Delivery Option"}
                                                        onChange={(e) => handleOptionChange(c.product.id, e.target.value)}
                                                        label={delivery_options[c.product.id].find(option => option.default)?.delivery_option.id|| "Select Delivery Option"}
                                                    >
                                                        {delivery_options[c.product.id].map(option => (
                                                            <MenuItem key={option.id} value={option.delivery_option.id}>
                                                                {`${option.delivery_option.name} - Delivery: ${option.delivery_option.min_days} to ${option.delivery_option.max_days} days`}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        )}
                                        <Typography variant="caption" className="font-xs text-muted">
                                            Delivery Fee: <span className="total_delivery_fee">GHS {delivery_options[c.product.id].find(option => option.default)?.delivery_option.cost}</span>
                                        </Typography>

                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                            ))}
                        </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box className="col-md-5 col-lg-3">
                    <Box className='mt-2 mb-30' p={2} borderRadius={1} boxShadow={1} bgcolor="white">
                        <Typography variant="h5" component="div" gutterBottom textTransform="uppercase" display="flex" justifyContent="space-between">
                            <span>Order Summary</span>
                        </Typography>
                        <Divider />

                        {/* Items total */}
                        <Box my={2}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1" color="text.secondary">Items total (2)</Typography>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    GHS {subTotal.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />

                        {/* Delivery fees */}
                        <Box my={2}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1" color="text.secondary">Delivery fees</Typography>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    GHS {totalDeliveryFee.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />

                        {/* Packaging fees */}
                        <Box my={2}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1" color="text.secondary">Packaging fees</Typography>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    GHS{totalPackagingFee.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />

                        {/* Grand total */}
                        <Box my={2}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h6" fontWeight="bold">Total</Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    GHS {grandTotal.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />

                        {/* Coupon Form */}
                        <Card component="form" sx={{ p: 2, mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Enter coupon code"
                                name="coupon_code"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button type="submit" variant="contained" color="secondary">
                                                Apply
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {appliedCoupon && (
                                <>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Applied Coupon: {appliedCoupon.code} - Discount: 2.33 GHS
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                        sx={{ mt: 1 }}
                                  
                                    >
                                        Remove Coupon
                                    </Button>
                                </>
                            )}
                        </Card>

                        <Divider sx={{ my: 2 }} />

                        {/* Confirm Order Button */}
                        <Button
                            fullWidth
                            component={Link}
                            variant="contained"
                            color="primary"
                            to='/order/checkout'
                        >
                            Continue
                        </Button>

                        {/* Terms and Conditions */}
                        <Typography variant="body2" align="center" color="text.secondary" mt={2}>
                            By proceeding, you are automatically accepting
                        </Typography>
                        <Typography variant="body2" align="center" color="primary">
                            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Terms & Conditions</a>
                        </Typography>
                    </Box>
                </Box>

            </div>
        </div>
    </main>

  );
};

export default CheckoutPage;
