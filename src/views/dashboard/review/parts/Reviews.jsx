import React, { useState, useEffect } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Card,
    CardContent,
    Rating,
    CircularProgress,
    Alert,
  } from '@mui/material';

import api from '../../../../api/api';

function Reviews() {
    const [value, setValue] = useState(0); // For Tabs
    const [verifiedReviews, setVerifiedReviews] = useState([]);
    const [unverifiedReviews, setUnverifiedReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        // Fetch reviews from the API
        fetchReviews();
    }, []);


    const fetchReviews = async () => {
      try {
        const response = await api.get('/api/v1/auth/user/reviews/');
        const reviews = response.data;
        setVerifiedReviews(reviews.filter((review) => review.status));
        setUnverifiedReviews(reviews.filter((review) => !review.status));
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };


    if (loading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress />
          </Box>
        );
    }
    
    if (error) {
        return (
            <Box mt={4} display="flex" justifyContent="center">
            <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    const renderReviews = (reviews) =>
        reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{review.product_name}</Typography>
                <Box display="flex" alignItems="center" mt={1} mb={2}>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {`${review.rating} out of 5`}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" mt={2}>
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
            <Typography textAlign="center" variant="body1" color="textSecondary">
                No reviews found in this category.
            </Typography>
        );


  return (
    <Box >
      <Typography fontWeight='bold' m={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} variant="h5" gutterBottom>
        My Reviews
      </Typography>

      <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Verified Reviews" />
          <Tab label="Unverified Reviews" />
        </Tabs>
      </Box>
      <Box mt={3}>
        {value === 0 && renderReviews(verifiedReviews)}
        {value === 1 && renderReviews(unverifiedReviews)}
      </Box>
    </Box>
  )
}

export default Reviews
