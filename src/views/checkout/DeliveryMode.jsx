import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { SERVER_URL } from '../../api/constants';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { useCart } from '../../utils/CartContext';


const DeliveryMode = () => {
    const { calculateOrderSummary} = useCart(); 
    const [cartItems, setCartItems] = useState([]);
    const [delivery_options, setDeliveryOptions] = useState([]);

    const [loading, setLoading] = useState(true);
    const fetchCheckoutData = async () => {
        try {
            const response = await api.get('/api/checkout/',);
            const data = response.data;            
            setCartItems(data.cart_items);
            setDeliveryOptions(data.product_delivery_options);
        
        } catch (err) {
            setError(err.response?.data?.detail || "An error occurred while fetching the checkout data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCheckoutData();
    }, []);

    // Function to call the backend API to update the delivery option
    const updateDeliveryOption = async (productId, deliveryOptionId, cartId) => {
        setLoading(true)
        try {
            const response = await api.post(
                '/api/update-delivery-option/', // API endpoint
                {
                    product_id: productId,
                    delivery_option_id: deliveryOptionId,
                    cart_id: cartId
                }
            );
            await calculateOrderSummary();
            await fetchCheckoutData();
        } catch (error) {
            // Handle error
            console.error('Error updating delivery option:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionChange = (productId, deliveryOptionId, cartId) => {       
        updateDeliveryOption(productId, deliveryOptionId, cartId); // Call the API to update delivery option
    }

  return (
    <>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        ): (

            <Grid container spacing={1}>
                {cartItems.map((c) => (
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}>
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
                                        <img src={`${SERVER_URL}${c.variant.image}`} width="50" alt="" />
                                        ) : (
                                        <img src={`${SERVER_URL}${c.product.image}`} width="50" alt="" />
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
                                            <Select
                                                labelId={`delivery-label-${c.product.id}`}
                                                label={`${option.delivery_option.name}`}
                                                value={c.delivery_option.id || "Select Delivery Option"}
                                                onChange={(e) => handleOptionChange(c.product.id, e.target.value, c.id)}
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
                                    Delivery Fee: <span className="total_delivery_fee">GHS {c.delivery_option.cost}</span>
                                </Typography>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )}
    </>


  );
};

export default DeliveryMode;
