import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Rating, } from '@mui/material';
import { Link } from 'react-router-dom';
import { truncateText } from '../../../../utils/Function';


const RecentProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setViewedProducts] = useState();
  const [error, setError] = useState(null);

  console.log(products)

  async function fetchViewedProducts() {
    try {
        const response = await api.get('/api/viewed-products/');
        setViewedProducts(response.data.recently_viewed || []);
    } catch (error) {
        setError(error.response?.data?.detail || 'Failed to fetch reviews');
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchViewedProducts();
  }, []);


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

  return (
    <Box>
        <Typography fontWeight='bold' m={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} variant="h5" gutterBottom>
            Recently viewed products
        </Typography>

        <Box>
        <div className="products">
        <div className="row">
          {products.map((p, index) => (
            <div key={index} className="col-4 col- col-6 col-xxl-3 col-xl-2 col-sm-4 col-xs-6 col-lg-3 col-md-3 col-md-4 px-1">
              <div className="product">
                  <figure className="product-media">
                      <Link to={`/${p.slug}/${p.id}/${p.sub_category.slug}`}>
                          <img src={`${SERVER_URL}${p.image}`} alt="Product image" className="product-image" />
                      </Link>

                      {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}

                  <div className="product-body">
                      <div className="product-cat">
                          <a href="">{p.sub_category.title}</a>
                      </div>                      
                      <h3 className="product-title">
                          <Link to={`/${p.slug}/${p.id}/${p.sub_category.slug}`}>{truncateText(p.title, 30)}</Link>
                      </h3>
                      {/* End .product-title */}
                      <div className="product-price">
                          <span className="new-price">GHS{(p.price * 1).toFixed(2)}</span>
                          <span className="old-price">Was GHS{(p.old_price * 1).toFixed(2)}</span>
                      </div>
                  
                  </div>
                  {/* End .product-body */}
              </div>
              {/* End .product */}
            </div>  
          ))}
          </div> 
        </div> 
        </Box>
      
    </Box>
  )
}

export default RecentProducts
