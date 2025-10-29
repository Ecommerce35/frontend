import React, {useEffect, useState} from 'react';
import useVariantChange, {truncateText}  from "../../utils/Function";
import { Link } from 'react-router-dom';
import QuantityCounter from '../../utils/Quantity';
import { addToCart } from '../../utils/CartFunctions';
import { useAuthStore } from '../../api/authStore';
import api from '../../api/api';
import { SERVER_URL } from '../../api/constants';
import { useCart } from '../../utils/CartContext';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from '@mui/material/Divider';
import RoomIcon from '@mui/icons-material/Room';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import Forward30Icon from '@mui/icons-material/Forward30';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ProductImage from "../../components/productDetail/ProductImage";


import BasicModal from '../partials/Modal';
import SizeChart from '../partials/SizeChart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';

const SizeProduct = ({ handleFollowToggle, isFollowing, sizes, variant,varimages, p, p_image, product}) => {
  
  const { cartCount, orderSummary, address, refreshCart } = useCart(); 
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const params = new URLSearchParams(location.search);
  // const handleVariantChange = useVariantChange(p.slug, p.id, p.sub_category.slug);
    const [variantimages, setVarImages] = useState(varimages);
    const [quantity, setQuantity] = useState(1);
    const [variantId, setVariantId] = useState(variant.id); // You can set initial variant if applicable
    const [productId, setProductId] = useState(p.id);
    const [isInCart, setIsInCart] = useState(false);
    const isAuthenticated = useAuthStore.getState().isLoggedIn();
    const [loading, setLoading] = useState(true); 
    const [activeId, setActiveId] = useState(null);

    const [prodductDetial, setProdductDetial] = useState(p)
    const [variantDetial, setvariantDetial] = useState(variant)
    const [sizeDetail, setSizeDetial] = useState(sizes)
    const [allImages, setAllImages] = useState(p_image)   

    const { sku, slug }= useParams();

    useEffect(()=>{
        const variantid = params.get('variantid');
        const convertedValue = parseInt(variantid, 10);
        if (variantid) {
            setVariantId(convertedValue);
        }
        setActiveId(convertedValue);
    })

    const [openchart, setOpenChart] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
      setOpenChart(true);
      setScroll(scrollType);
    };

    const handleCloseChart = () => {
      setOpenChart(false);
    };

    
  
    // Check cart on mount
    useEffect(() => {
      checkCart();
    }, [productId, variantId, isAuthenticated]);
  
    const checkCart = async () => {
      try {
        setLoading(true);
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Find item in local cart for guest users
        const itemInLocalCart = localCart.find(
          item => item.productId === productId && item.variantId === variantId
        );
    
        // If the user is authenticated, check the server cart
        if (isAuthenticated) {
          const serverCartResponse = await checkServerCart(productId, variantId);
          await handleServerCartResponse(serverCartResponse);
        } 
        // For guest users, handle the local cart check
        else if (itemInLocalCart) {
          setQuantity(itemInLocalCart.quantity);
          setIsInCart(true);
        } else {
          setIsInCart(false);
        }
      } catch (error) {
        console.error("Error checking cart:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Helper to check the cart on the server
    const checkServerCart = async (productId, variantId) => {
      try {
        const response = await api.get(`/api/cart/check/`, {
          params: { product_id: productId, variant_id: variantId }
        });
        return response.data;
      } catch (error) {
        console.error("Error checking cart on server:", error);
        throw error;
      }
    };
    
    // Handle server response and update the cart state accordingly
    const handleServerCartResponse = async (response) => {
      if (response.inCart) {
        setQuantity(response.quantity);
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    };

    const handleVariantChange = async (newVariantId) => {
      try {
        // Set the loading state to true while the request is being made
        setLoading(true);
        // Send a GET request to the server to fetch the product data based on the selected variant
        const response = await api.get(`/api/v1/product/${sku}/${slug}/`, {
          params: { variantid: newVariantId || '' },
        });

        setVariantId(newVariantId);
        setProdductDetial(response.data.product);
        setAllImages(response.data.p_images);
        setvariantDetial(response.data.variant_data.variant);
        setVarImages(response.data.variant_data.variant_images);
        setSizeDetial(response.data.variant_data.sizes);

        // Get the current URL and its search parameters
        const currentUrl = new URL(window.location.href); // Create a URL object from the current URL
        const searchParams = currentUrl.searchParams; // Get the search params object

        // Update the variantid parameter in the URL
        searchParams.set('variantid', newVariantId);
        // Use window.history.replaceState to update the URL without causing a page refresh
        window.history.replaceState(null, '', `${currentUrl.pathname}?${searchParams.toString()}`);
    
      } catch (error) {
        // Handle any errors that occur during the request
        setError('Error fetching product data');    
      } finally {
        // Set loading state to false once the request is completed
        setLoading(false);
      }
    };
  
    const handleAddToCart = async () => {
      setLoading(true);
      if (isAuthenticated) {
        await addToCartOnServer(1); // Default 1 quantity when first added
      } else {
        await addToLocalStorage(1);
      }
      await checkCart();
      setLoading(false);
    };
  
    const addToCartOnServer = async (qty) => {
      try {
        // Make the API call to add the item to the server-side cart
        const response = await api.post('/api/cart/add/', {
          product_id: productId,
          variant_id: variantId,
          quantity: qty,
        });
    
        // Set the item as in the cart if the response is successful
        setIsInCart(true);
        // Optionally, you can log or handle the response here if needed
        console.log('Item added to cart:', response.data);
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error adding to server-side cart:", error);
      }
      await refreshCart();
    };
  
    const addToLocalStorage = async (qty) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemIndex = cart.findIndex(item => item.productId === productId && item.variantId === variantId);
  
      if (itemIndex !== -1) {
        cart[itemIndex].quantity += qty; // Update existing quantity
      } else {
        cart.push({ productId, variantId, quantity: qty }); // Add new item with quantity
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
      setIsInCart(true);
  
      // Refresh the cart count after updating local storage
      await checkCart();
      await refreshCart();
    };
    
    const handleIncrease = () => {
      setQuantity(prev => prev + 1);

      setLoading(true);
  
      if (isAuthenticated) {
        addToCartOnServer(1); // Add one more unit to server-side cart
      } else {
        addToLocalStorage(1); // Add one more unit to local storage cart
      }
      refreshCart();
      setLoading(false);
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(prev => prev - 1);
  
        if (isAuthenticated) {
          addToCartOnServer(-1); // Remove one unit from server-side cart
        } else {
          addToLocalStorage(-1); // Remove one unit from local storage cart
        }
      } else {
        handleRemoveFromCart(); // Remove completely if quantity is 1
      }
      // refreshCart();
    };
  
    const handleRemoveFromCart = async () => {
      setLoading(true);
      if (isAuthenticated) {
        removeFromServer();
      } else {
        removeFromLocalStorage();
      }

      await checkCart();
      setLoading(false);
    };
  
    const removeFromServer = async () => {
      try {
        // Make the API call to remove the item from the server-side cart
        const response = await api.post('/api/cart/remove/', {
          product_id: productId,
          variant_id: variantId,
        });
    
        // If successful, update the state to reflect the removal
        setIsInCart(false);
        setQuantity(0);
        
        // Optionally, you can log or handle the response here if needed
        console.log('Item removed from cart:', response.data);
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error removing from server-side cart:", error);
      }
    
      // Optionally, refresh the cart (uncomment if needed)
      await refreshCart();
    };
  
    const removeFromLocalStorage = async () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = cart.filter(item => !(item.productId === productId && item.variantId === variantId));
  
      // Update localStorage with the modified cart
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      // Update the UI to reflect that the item is no longer in the cart
      setIsInCart(false);
      setQuantity(0);
  
      // Refresh the cart count after updating local storage
      await refreshCart();
    };

    const handleSizeChange = async (event) => {
      const selectedVariantId = event.target.value;
        setActiveId(selectedVariantId);
        await handleVariantChange(selectedVariantId);
        await checkCart();
    };


  const isVariant = prodductDetial && sizeDetail;


  return (
    <div className="row">
        <div className="col-lg-9">
            <div className="product-details-top">
                <div className="row">
                    <div className="col-md-6">
                        <div className="product-gallery">
                            {isVariant ? (
                                <figure className="product-main-image">
                                    <span className="product-label label-top">Top</span>
                                    <ProductImage mainImage={variantDetial.image} />
                                    <Link to="#" id="btn-product-gallery" className="btn-product-gallery">
                                      <ZoomInIcon />
                                    </Link>
                                </figure>
                            ):(
                                <figure className="product-main-image">
                                    <span className="product-label label-top">Top</span>
                                    <ProductImage mainImage={prodductDetial.image} />
                                    <Link to="#" id="btn-product-gallery" className="btn-product-gallery">
                                        <ZoomInIcon />
                                    </Link>
                                </figure>
                            )}

                            <div id="product-zoom-gallery" className="product-image-gallery">
                                <Link className="product-gallery-item active" to="#" >
                                    <img src={`${prodductDetial.image}`} alt="product side" />
                                </Link>

                                {variantimages.length === 0 ? (
                                  <>
                                    {allImages && allImages.map((p) => (
                                        <Link key={p.id} className="product-gallery-item">
                                            <img src={`${p.images}`} alt="product cross" />
                                        </Link>
                                    ))}
                                  </>
                                ):(
                                  <>
                                    {variantimages && variantimages.map((p) => (
                                      <Link key={p.id} className="product-gallery-item">
                                            <img src={`${p.images}`} alt="product cross" />
                                      </Link>
                                    ))}
                                  </>
                                )}
                            </div>
                        </div>
                    </div>
                    

                    <div className="col-md-6">
                        <div className="product-details product-details-sidebar">
                          <SizeChart open={openchart} handleClose={handleCloseChart} />
                          <h1 className="product-title">{prodductDetial.title}</h1>

                          <div className="ratings-container">
                            <Rating name={`rating-1`} value={product.average_rating} precision={0.5} readOnly sx={{ marginLeft: 1 }}/>
                                <a className="ratings-text" href="#product-review-link" id="review-link">( {product.review_count} Review{product.review_count !== 1 ? 's':''})</a>
                            </div>

                            <div className="product-price">
                                <span data-base-price={variantDetial.price} id="price" className="new-price">GHS{variantDetial.price.toFixed(2)}</span>
                                <span data-base-price={prodductDetial.old_price} className="old-price">GHS{prodductDetial.old_price.toFixed(2)}</span>
                            </div>
                            <Divider/>
                            {/* <Skeleton variant="rectangular" width={210} height={118} /> */}

                            <div className="d-flex justify-content-between mb-2">
                                <div className="d-flex justify-content-between">
                                    <span for="size-guide">Selected:  </span> &nbsp;&nbsp;
                                    <span id="selected_variant" className="fw-bold">Size {variantDetial.size.name}</span>
                                </div>
                                <span style={{ cursor: 'pointer'}} className="chart_link"><a id="sizeChart-button" onClick={handleClickOpen('paper')}><AssignmentIcon />size guide</a></span>
                            </div>

                            <div className="details-filter-row details-row-size">
                                <label>Sizes:</label>
                                <div className="product-nav swatch-container product-nav-thumbs">
                                    <select name="size" id="mySelect" onChange={(event) => handleSizeChange(event)} className="form-control">
                                      {sizeDetail.map((rs) => (
                                        <option key={rs.id} value={rs.id} selected={variantDetial.id === rs.id}>
                                          {rs.size.name}
                                        </option>
                                      ))}
                                    </select>
                                </div>
                            </div>

                            <div className='d-lg-none' style={{ margin: '10px', padding: 0 }}>
                                <div id="add_to_cart_btn" className="cart-option">
                                    {!isInCart ? (
                                        <div id="button_toggle">
                                            <button disabled={loading} title="Add to shopping Cart" onClick={handleAddToCart} className="cart-btn shadow w-100">
                                            {loading ? "Loading..." : "Add to Cart"}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="input-counter">
                                            <button disabled={loading} className="minus-button shadow-sm text-white" onClick={handleDecrease}>
                                                -
                                            </button>
                                            <input className="quantity_total_" type="text" min={1} value={quantity} readOnly />
                                            <button disabled={loading} className="plus-button shadow-sm text-white" onClick={handleIncrease}>
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Accordion
                              sx={{
                                mb: 2,
                                boxShadow: 'none',    // Remove box shadow
                                border: 'none',       // Remove border
                                '&:before': {
                                  display: 'none',    // Remove the default divider line
                                },
                              }}
                             >
                              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <Typography variant='h6'>Ships to:</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  <List>
                                    <Grid container direction="row" spacing={2}>
                                      {p.available_in_regions.map((p) => (
                                        <>
                                        <Grid key={p.id}>
                                        <ListItem>
                                          <WhereToVoteIcon color='success' /> {p.name}
                                        </ListItem>
                                        </Grid>
                                        </>
                                      ))}
                                    </Grid>
                                  </List>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion
                              sx={{
                                boxShadow: 'none',    // Remove box shadow
                                border: 'none',       // Remove border
                                '&:before': {
                                  display: 'none',    // Remove the default divider line
                                },
                              }}
                              >
                              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                              {p.product_type === 'grocery' ? (
                                <Typography variant='h6'>Ingredients:</Typography>
                              ):(
                                <Typography variant='h6'>Features:</Typography>
                              )}

                              </AccordionSummary>
                              <AccordionDetails>
                                <Box className='mb-2' sx={{ mt: 1 }}>
                                  <div dangerouslySetInnerHTML={{ __html: p.features }} />
                                </Box>
                              </AccordionDetails>
                            </Accordion>


                            <div className="product-details-footer details-footer-col">

                                <div className="social-icons social-icons-sm">
                                    <span className="social-label">Share:</span>
                                    <a href="#" className="social-icon" title="Facebook" target="_blank"><FacebookIcon /></a>
                                    <a href="#" className="social-icon" title="Twitter" target="_blank"><XIcon /></a>
                                    <a href="#" className="social-icon" title="Instagram" target="_blank"><InstagramIcon /></a>
                                    <a href="#" className="social-icon" title="Pinterest" target="_blank"><PinterestIcon /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <aside className='col-lg-3'>
          <div className="p-6 mb-6 bg-white shadow-sm rounded-lg">

          <div className='d-none d-md-block' style={{ margin: '10px', padding: 0 }}>
            <div id="add_to_cart_btn" className="cart-option">
                {!isInCart ? (
                    <div id="button_toggle">
                        <button disabled={loading} title="Add to shopping Cart" onClick={handleAddToCart} className="cart-btn shadow w-100">
                        {loading ? "Loading..." : "Add to Cart"}
                        </button>
                    </div>
                ) : (
                    <div className="input-counter">
                        <button disabled={loading} className="minus-button shadow-sm text-white" onClick={handleDecrease}>
                            -
                        </button>
                        <input className="quantity_total_" type="text" min={1} value={quantity} readOnly />
                        <button disabled={loading} className="plus-button shadow-sm text-white" onClick={handleIncrease}>
                            +
                        </button>
                    </div>
                )}
            </div>
          </div>
            <Divider />

            {/* Delivery Section */}
            <h6 className="font-semibold text-gray-800 mt-2">Delivery & Location</h6>
            <BasicModal open={open} handleClose={handleClose} />
            <ul>
              <li className="flex items-start mb-4">
                <div className='flex items-center'>
                <RoomIcon fontSize='medium'/>
                  <span className="block text-md text-gray-700 hover:underline">
                    {isAuthenticated && address.address ? (
                      <Box sx={{ cursor: 'pointer' }} onClick={handleOpen}>{address.address ? (truncateText(address?.address, 34)):(<>Add Address</>)}</Box> 
                    ):(
                      <Box sx={{ cursor: 'pointer' }} onClick={handleOpen}>Login to add address</Box> 
                    )}
                  </span>
                </div>
              </li>
              <li className="border-t border-gray-300 mt-4"></li>
            </ul>

            {/* Return & Warranty Section */}
            <h6 className=" font-semibold text-gray-800 mt-2">Return & Warranty</h6>
            <ul>
              <li className="flex items-center mb-1">
                <SafetyCheckIcon/>
                <span className="text-md text-gray-700">100% Authentic</span>
              </li>
              <li className="flex items-center mb-1">
                <Forward30Icon/>
                <span className="text-md text-gray-700">10 Days Return</span>
              </li>
              <li className="flex items-center">
                <CalendarMonthIcon/>
                <span className="text-md text-gray-700">12 Months Warranty</span>
              </li>
            </ul>

            <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              {/* Responsive Grid layout */}
              <Grid container alignItems="center" spacing={2}>
                {/* Seller Info */}
                {/* Seller Info */}
                <Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    Sold by: <strong>{p.vendor.name} {p.vendor.is_subscribed ? (<VerifiedIcon fontSize='large' color='info'/>): ''}  </strong>
                  {/* Verified badge */}
                  </Typography>
                  
                  {/* Link to seller info */}
                  <Link to={`/seller/${p.vendor.slug}`} underline="hover" color="info" variant="body2">
                    View Seller Info
                  </Link>
                </Box>

                {/* Follow Button */}
                <Box textAlign={{ xs: 'center', sm: 'right' }}>
                  <Button
                    variant="contained"
                    color={isFollowing ? "secondary" : "info"}
                    startIcon={<FavoriteIcon />}
                    size="medium"
                    onClick={handleFollowToggle}
                    sx={{ textTransform: 'none', width: '100%' }}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                </Box>
              </Grid>

              {/* Divider */}
              <Divider sx={{ my: 2 }} />

              {/* Additional Seller Info */}
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Ships from: <strong>AwesomeVendor's Warehouse</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Returns accepted within 30 days
                </Typography>
              </Box>
            </Box>
          </div>
        </aside>

    </div>

  )
}

export default SizeProduct
