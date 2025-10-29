import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Box, CircularProgress, Typography, Button } from '@mui/material';
import api from '../../../../api/api';
import { Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';


const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sellerId = 1;

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/v1/auth/user/orders/');
      const orders = response.data;
      console.log(response)
      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(orders);

  useEffect(() => {
    fetchOrders();

    // WebSocket connection for real-time updates
    // const socket = new WebSocket("vendor/ws/vendor/order/");
    // const socket = new WebSocket(`ws://127.0.0.1:8000/ws/seller/${sellerId}/`);
    // console.log(socket)

    // socket.onopen = () => {
    //   console.log('WebSocket connection established');
    // };

    // socket.onmessage = (event) => {
    //   const newOrder = JSON.parse(event.data);

    //   // Notify the user
    //   Swal.fire({
    //     title: "New Order Received!",
    //     text: `Order #${newOrder.order_number} has been placed.`,
    //     icon: "info",
    //     confirmButtonText: "OK",
    //   });

    //   // Update the orders list
    //   setOrders((prevOrders) => [...prevOrders, newOrder]);
    // };

    // socket.onclose = (event) => {
    //   console.error('WebSocket closed unexpectedly:', event);
    // };

    // socket.onerror = (error) => {
    //     console.error('WebSocket error:', error);
    // };

    // return () => {
    //   socket.close(); // Clean up the connection on component unmount
    // };
  }, []);




  // Define columns for the DataGrid
  const columns = [
    { field: 'date_created', headerName: 'Date Created', width: 150 },
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'order_number', headerName: 'Order Number', width: 120 },
    { field: 'total', headerName: 'Total (GHS)', width: 150, type: 'number' },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 150,
    //   renderCell: (params) => {
    //     const [status, setStatus] = useState(params.row.status);

    //     const handleStatusChange = async (event) => {
    //       const newStatus = event.target.value;

    //       // Show confirmation dialog
    //       const result = await Swal.fire({
    //         title: 'Are you sure?',
    //         text: `Do you want to change the status to "${newStatus}"?`,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, change it!',
    //       });

    //       if (result.isConfirmed) {
    //         setStatus(newStatus); // Optimistically update the UI

    //         try {
    //           setLoading(true);

    //           const response = await api.put(`/vendor/order-status-change/${params.row.id}/`, { status: newStatus });
    //           // Show success message
    //           Swal.fire({
    //             title: 'Success!',
    //             text: 'Order status has been updated successfully.',
    //             icon: 'success',
    //             confirmButtonColor: '#3085d6',
    //           });
    //           fetchOrders();
    //         } catch (error) {
    //           console.error('Failed to update status:', error);

    //           // Revert the status on failure
    //           setStatus(params.row.status);

    //           // Show error message
    //           Swal.fire({
    //             title: 'Error!',
    //             text:`Failed to update status. Please try again.${error}`,
    //             icon: 'error',
    //             confirmButtonColor: '#d33',
    //           });
    //         } finally {
    //           setLoading(false);
    //         }
    //       } else {
    //         // Revert the dropdown selection if the user cancels
    //         setStatus(params.row.status);
    //       }
    //     };

  
    //     return (
    //       <Select
    //         value={status}
    //         onChange={handleStatusChange}
    //         size="small"
    //         fullWidth
    //       >
    //         <MenuItem value="pending">Pending</MenuItem>
    //         <MenuItem value="processing">Processing</MenuItem>
    //         <MenuItem value="delivered">Delivered</MenuItem>
    //         <MenuItem value="canceled">Canceled</MenuItem>
    //       </Select>
    //     );
    //   },
    // },
    { field: 'payment_method', headerName: 'Payment Method', width: 110 },
    
    {
      field: 'details',
      headerName: 'Details',
      width: 110,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/user/dashboard/order/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  // Prepare rows data
  const rows = orders.map((order, index) => ({
    date_created: new Date(order.date_created).toLocaleString(),
    id: order.id,
    order_number: order.order_number,
    total: order.total.toFixed(2),
    // status: order.status,
    payment_method: order.payment_method,
  }))
  .sort((a, b) => a.date_created - b.date_created);

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Typography fontWeight='bold' m={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} variant="h5" gutterBottom>
        Your orders
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          // pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
        />
      )}
    </Box>
  );
};

export default OrderTable;
