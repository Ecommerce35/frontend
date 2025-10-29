import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Avatar, Typography, Box, Skeleton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import api from '../../../../api/api';
import { SERVER_URL } from '../../../../api/constants';

const ProductReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true)

    console.log(reviews);
    


    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await api.get('/vendor/data'); // Replace with your API endpoint
                const vendorData = response.data;
                setReviews(vendorData.reviews);
            } catch (error) {
                console.error("Error fetching vendor data", error);
            } finally {
                setLoading(false)
            }
        };

        fetchVendorData();
    }, []);

    const columns = [
        {
            field: 'product',
            headerName: 'Product',
            width: 250,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={`${SERVER_URL}${params.row?.product_image}`} alt={params.value} sx={{ marginRight: 1 }} />
                    <Typography>{params.value}</Typography>
                </div>
            ),
        },
        { 
            field: 'user', 
            headerName: 'Customer', 
            width: 150, 
            // valueGetter: (params) => params.row && params.row.user ? params.row.user.first_name : "Unknown" // Null check for both row and user
        },
        { field: 'review', headerName: 'Review', width: 300 },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 120,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(params.value || 0)].map((_, i) => (
                        <StarIcon key={i} style={{ color: '#ffa726' }} />
                    ))}
                    {[...Array(5 - (params.value || 0))].map((_, i) => (
                        <StarIcon key={5 + i} style={{ color: '#e0e0e0' }} />
                    ))}
                </div>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: () => (
                <IconButton color="primary">
                    <VisibilityIcon />
                </IconButton>
            ),
        },
    ];

    if (loading) {
        // Show skeletons while loading
        return (
          <Box sx={{ height: 600, width: '100%' }}>
            <Skeleton variant="text" width="200px" height={40} style={{ marginBottom: '10px' }} />
            <Skeleton variant="rectangular" width={120} height={40} style={{ marginBottom: '10px' }} />
            <Skeleton variant="rectangular" height={50} />
          </Box>
        );
    }

    if (reviews.length === 0) {
        return (
            <Box sx={{ height: 600, width: '100%', textAlign: 'center', paddingTop: 3 }}>
            <p>No orders available</p>
            </Box>
        );
    }

    return (
        <div style={{ height: 600, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Product Reviews
            </Typography>
            <DataGrid
                rows={reviews.map((review) => ({
                    id: review.id,  // Ensure each review has a unique ID
                    product: review.product,
                    product_image: review.product_image,
                    user: review.user ? review.user.email : "Unknown",  // Fallback if user is missing
                    review: review.review,
                    rating: review.rating,
                }))}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </div>
    );
};

export default ProductReviews;
