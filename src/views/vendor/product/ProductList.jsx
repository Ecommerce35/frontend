import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import { Chip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Skeleton from '@mui/material/Skeleton';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

import { SERVER_URL } from '../../../api/constants';
import api from '../../../api/api';
import { Link, useNavigate } from 'react-router-dom';

const SellerProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();

    const handleEditClick = (productId) => {
        navigate(`/vendor/product/change/${productId}`);
    };

    useEffect(() => {
        fetchProducts(); // Fetch product data to populate the form
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get(`/vendor/products/`);
            const productData = response.data;
            console.log(productData)
            setProducts(productData.products)
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
          setLoading(false)
        }
    };

    const handleDelete = async (productId) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await api.delete(`/vendor/product/change/${productId}/`);
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
          await fetchProducts();
        } catch (error) {
          Swal.fire(
            'Error!',
            error.response?.data || 'An error occurred while deleting the product.',
            'error'
          );
          console.error("Error deleting product:", error.response?.data || error.message);
        }
        
      }
    };

    console.log(products)

    if (loading) {
      // Show skeleton loaders while fetching products
      return (
        <Grid sx={{ width: '100%' }} container spacing={1}>
          {Array(10)
            .fill()
            .map((_, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 3, lg: 3 }} key={index}>
                <Card sx={{ height: '100%' }}>
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent>
                    <Skeleton animate='wave' variant="text" width="80%" />
                    <Skeleton animate='wave' variant="text" width="60%" />
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Skeleton animate='wave' variant="text" width="40%" />
                      <Skeleton animate='wave' variant="text" width="30%" />
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center">
                      <Skeleton animate='wave' variant="circular" width={24} height={24} />
                      <Skeleton animate='wave' variant="circular" width={24} height={24} />
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      );
    }

    
    if (products.length === 0) {
    // Display a message if no products are available
      return (
        <>
          <Box sx={{ width: '100%' }} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" fontWeight="bold">
              My Products
            </Typography>
            <Button LinkComponent={Link} to='/vendor/addproduct' variant="contained" color="primary" startIcon={<AddIcon />}>
              Add New Product
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', padding: 3 }}>
            <Typography variant="h6">No products yet</Typography>
          </Box>
        </>
      );
    }



  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box 
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 2,
        }}
        >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold">
            My Products
          </Typography>
          <Button LinkComponent={Link} to='/vendor/addproduct' variant="contained" color="primary" startIcon={<AddIcon />}>
            Add New Product
          </Button>
        </Box>

        <Grid container spacing={1}>
          {products.map((product) => (
            <Grid size={{ xs: 6, sm: 6, md: 3, lg:3 }} key={product.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${SERVER_URL}${product.image}`}
                  alt={product.name}
                />
                <CardContent>
                <Chip
                    label={product.status}
                    color={product.status !== 'published' ? 'error' : 'success'}
                    variant="outlined" // Optional: Add this for an outlined badge style
                    size="small" // Optional: Adjust size
                    sx={{
                      fontWeight: 'medium',
                      textTransform: 'capitalize', // To ensure "Draft" or "Success" looks neat
                    }}
                  />
                  <Typography variant="h6" fontWeight="medium" noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    GHS {product.price.toFixed(2)}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Tooltip title={product.total_quantity > 0 ? 'In Stock' : 'Out of Stock'}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        // color={product.total_quantity > 0 ? green[500] : red[500]}
                      >
                        {product.total_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </Typography>
                    </Tooltip>
                    <Badge badgeContent={product.total_quantity} color={product.total_quantity > 0 ? 'primary' : 'error'}>
                      <Typography variant="body2" fontWeight="medium">
                        Quantity: {product.total_quantity}
                      </Typography>
                    </Badge>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Box display="flex" alignItems="center">
                    <Tooltip title="Edit Product">
                      <IconButton color="primary" onClick={() => handleEditClick(product.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton color="error" onClick={() => handleDelete(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Box>
    </Box>
  );
};

export default SellerProducts;
