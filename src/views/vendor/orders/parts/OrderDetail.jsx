import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress,MenuItem, Select, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import api from '../../../../api/api';
import { SERVER_URL } from '../../../../api/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const OrderDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/vendor/order/${id}/`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order details', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  console.log(orderDetails)

 const handleStatusChange = async (productId, newStatus) => {
  // Ask for confirmation using SweetAlert2
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `You are about to change the status to "${newStatus}". Update would be sent to your customer after this`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'No, cancel!',
  });

  if (result.isConfirmed) {
    try {
      // Make API call to update the status
      const response = await api.put(
        `/vendor/order/${productId}/update-status/`,
        { status: newStatus }
      );

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'The status has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      fetchOrderDetails();

    } catch (error) {
      // Show error message
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.detail || 'An error occurred while updating the status.',
        icon: 'error',
        confirmButtonText: 'OK',
      });

      console.error('Error updating status:', error.response?.data || error.message);
    }
    } else {
      // If the user cancels, optionally log or handle the cancellation
      console.log('Status update cancelled by user.');
    }
  };

  return (
    <Box sx={{ flex: 1, width: '100%' }}>

    <Button 
      mb={2}
      variant="contained" 
      startIcon={<ArrowBackIcon />} 
      onClick={() => navigate(-1)} 
      sx={{ margin: '1rem 0' }} // Optional styling
      >
      Back
    </Button>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : orderDetails ? (
        <>
          <Typography variant="h5" gutterBottom>
            Order #{orderDetails?.order_number}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Date ordered: {new Date(orderDetails.date_created).toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Status: {orderDetails.status}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total: GHS{orderDetails.vendor_total.toFixed(2)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Delivery fee: GHS{orderDetails.vendor_delivery_cost.toFixed(2)}
          </Typography>
          <Typography mb={1} variant="body1" gutterBottom>
            Payment Method: {orderDetails.payment_method}
          </Typography>
          <Divider/>
          <Typography variant='h5'>
            Shipping Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {orderDetails.address.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Mobile: {orderDetails.address.mobile}
          </Typography>
          <Typography mb={1} variant="body1" gutterBottom>
            Address: {orderDetails?.address.country}, {orderDetails.address.region}, {orderDetails.address.town} <br />
            {orderDetails.address.address}
          </Typography>
          
          <Divider/>
          <Typography variant='h5'>
            Delivery Date range
          </Typography>
          <Typography mb={4} variant="body1" gutterBottom>
            Date: {orderDetails.vendor_delivery_date_range}
          </Typography>

          <Divider/>
          <Typography variant='h5'>
            Product Details
          </Typography>
          <Box sx={{ mt: 3, overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Variant</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price (GHS)</TableCell>
                  <TableCell>Total (GHS)</TableCell>
                  <TableCell>Day to deliver</TableCell>
                  <TableCell>Delivery type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.order_products.map((product) => (
                  <TableRow key={product.product.id}>
                    <TableCell>
                      <img
                        width="50"
                        src={
                          product.variant && product.variant.image
                            ? `${SERVER_URL}${product.variant.image}`
                            : product.product.image
                            ? `${SERVER_URL}${product.product.image}`
                            : '/path/to/default/image.jpg' // Default image as fallback
                        }
                        alt="Product Image"
                      />
                    </TableCell>
                    <TableCell>{product.variant?.title || 'None'}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.amount.toFixed(2)}</TableCell>
                    <TableCell>{product.delivery_date_range}</TableCell>
                    <TableCell>{product.selected_delivery_option.name}</TableCell>

                    <TableCell>
                      <Select
                        value={product.status}
                        onChange={(e) => handleStatusChange(product.id, e.target.value)}
                        displayEmpty
                        size="small"
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="canceled">Canceled</MenuItem>
                      </Select>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="error">
          Order not found
        </Typography>
      )}
    </Box>
  );
};

export default OrderDetail;
