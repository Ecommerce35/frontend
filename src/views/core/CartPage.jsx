import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utils/Function';
import { useCart } from '../../utils/CartContext';
import { useAuthStore } from '../../api/authStore';
import api from '../../api/api';
import { SERVER_URL } from '../../api/constants';


import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Cart = () => {
    const isAuthenticated = useAuthStore.getState().isLoggedIn();
    const { refreshCart } = useCart();
    
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [packagingFee, setPackagingFee] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch cart items when component mounts
    useEffect(() => {
        fetchCartItems();
    }, []);
    
    // Function to fetch the cart items from the backend or localStorage
    const fetchCartItems = async () => {
        try {
            let response;
            if (isAuthenticated) {
                response = await api.get('/api/cart/items/');
            } else {
                const cart = JSON.parse(localStorage.getItem('cart'));
                if (cart.length === 0) throw new Error('No items in the cart');
    
                const cartData = cart.map(item => ({
                    product_id: item.productId,
                    variant_id: item.variantId,
                    quantity: item.quantity,
                }));
                response = await api.post('/api/cart/items/', cartData);
            }
            setCartItems(response.data.cart_items);
            setTotalAmount(response.data.total_amount);
            setPackagingFee(response.data.total_packaging_fee);
            setError(null);
        } catch (err) {
            setError('Error fetching cart items');
        } finally {
            setLoading(false);
            // await refreshCart();
        }
    };
    
    const updateQuantity = async (item, change, currentQuantity) => {
        setLoading(true);
        const productId = item.product.id;
        const variantId = item.variant ? item.variant.id : null;
        const newQuantity = currentQuantity + change; // Calculate new quantity
    
        try {
            // For authenticated users, update the cart on the server
            if (isAuthenticated) {
                if (newQuantity > 0) {
                    // Update the quantity on the server
                    await api.post('/api/cart/add/', { product_id: productId, variant_id: variantId, quantity: change });
                } else {
                    // If the new quantity is 0 or less, delete the item from the cart
                    await deleteCartItem(item);
                }
            } 
            // For guest users, update the cart in localStorage
            else {
                if (newQuantity > 0) {
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const itemIndex = cart.findIndex(cartItem => cartItem.productId === productId && cartItem.variantId === variantId);
                    
                    if (itemIndex !== -1) {
                        cart[itemIndex].quantity = newQuantity; // Update quantity in cart
        
                        if (cart[itemIndex].quantity < 1) {
                            // If quantity is less than 1, remove the item from the cart
                            cart.splice(itemIndex, 1); 
                        }
                        
                        // Save updated cart to localStorage
                        localStorage.setItem('cart', JSON.stringify(cart));
                    } else {
                        console.warn("Item not found in cart!");
                    }
                } else {
                    await deleteCartItem(item);
                }
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            await refreshCart(); // Refresh the cart to reflect changes
            setLoading(false);   // Stop loading indicator
        }
    
        await fetchCartItems();  // Re-fetch cart items to display updated state
    };
    
    // Function to delete a cart item
    const deleteCartItem = async (item) => {
        setLoading(true);
    
        const productId = item.product.id;
        const variantId = item.variant ? item.variant.id : null;
    
        try {
            if (isAuthenticated) {
                const response = await api.post('/api/cart/remove/', { product_id: productId, variant_id: variantId });
                if (response.status !== 200) throw new Error('Failed to remove item from the server');
            } else {
                let cart = JSON.parse(localStorage.getItem('cart'));
                const itemIndex = cart.findIndex(cartItem => cartItem.productId === productId && cartItem.variantId === variantId);
                if (itemIndex === -1) throw new Error(`Item not found for productId: ${productId} and variantId: ${variantId}`);
    
                cart.splice(itemIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            await fetchCartItems();
            await refreshCart();
            setLoading(false);
        }
    };
    

  // Render the cart items
  return (
    <>
    <Header/>
        <main className="container">

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                 <CircularProgress />
               </Box>
            ):
            cartItems && cartItems.length === 0 ?(
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="error-info text-center">
                        
                        <div className="error-content">
                          <h5>No Cart Item Found</h5>
                          <p>
                            Sorry,{" "}
                            <strong>Dear Customer</strong>
                            , your cart is empty. Please return to the homepage.
                          </p>
                          <div className="error-button">
                            <Link to={'/'} className="error-btn">Shop More!</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ) : (
                <div id="cart_items" className="bg-light">
                    <div className="row main-div">
                        <div className="col-lg-8 col-md-8 collg8">
                            {cartItems.map((c, i) => (
                                <section className="allData shadow-sm" key={i}>
                                    <div id="cartdiv" className="main-section">
                                        <div className="d-flex space-x-5 justify-content-between">
                                            
                                            <div className="pb-0 mb-0 product-thumbnail">
                                                <Link to={`/${c.product.slug}/${c.product.id}/${c.product.sub_category.slug}`} className="product-thumbnail">
                                                    {c.product.variant !== 'None' ? (
                                                        <img className="product-thumbnail mn-200" src={`${SERVER_URL}${c.variant?.image}`} width="100" alt="" />
                                                    ) : (
                                                        <img className="product-thumbnail mn-200" src={`${SERVER_URL}${c.product.image}`} width="100" alt="" />
                                                    )}
                                                </Link>
                                                <div className="align-items-center w-100">
                                                    <button disabled={loading} onClick={() => deleteCartItem(c)} className="badge btn-block ml-15 px-2 py-2 shadow-sm shadow-sm border text-dark bg-light">
                                                    {loading ? "Loading..." : "Remove"} 
                                                    </button>
                                                </div>
                                            </div>
                                
                                            <div className="w-100 vertical-container">
                                                <div className=''>
                                                    <h5 className="cart-item-title">
                                                        <Link to={`/${c.product.slug}/${c.product.id}/${c.product.sub_category.slug}`}>{truncateText(c.product.title, 40)}</Link>
                                                    </h5>
                                                    <p>
                                                    {c.variant ? (
                                                        <>
                                                        {c.variant.size ? (
                                                            <>Size: <span>{c.variant.size.name}</span></>
                                                        ) : null}

                                                        {c.variant.size && c.variant.color ? ' | ' : ''}

                                                        {c.variant.color ? (
                                                            <>Color: <span>{c.variant.color.name}</span></>
                                                        ) : null}
                                                        </>
                                                    ) : (
                                                        <>No variant available</>  // Display this if no variant exists
                                                    )}
                                                    </p>
                                                </div>
                                    
                                                <div className=''>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h4 className="product-price">
                                                        {!c.variant? (
                                                            <span className="new-price" >
                                                            GHS {(c.product.price ).toFixed(2)}
                                                            </span>
                                                        ) : (
                                                            <span className="new-price">
                                                                GHS {(c.variant?.price).toFixed(2)}
                                                            </span>
                                                        )}
                                                        </h4>
                                                    </div>
                                        
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            
                                                        </div>
                                                        <div className="input-counter">
                                                            <button  className="minus-button updateQuantity shadow-sm text-white" onClick={() => updateQuantity(c, -1, c.quantity)}>
                                                                -
                                                            </button>
                                                                <input className="quantity_total_" type="text" min="1" max="6" value={c.quantity} readOnly />
                                                            <button className="plus-button updateQuantity shadow-sm text-white" onClick={() => updateQuantity(c, 1, c.quantity)}>
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>

                        <Box className='col-lg-4 col-md-4' id="summary_card" sx={{ maxWidth: '100%', padding: '' }}>
                            <Card sx={{ boxShadow: 1, borderRadius: '5px' }}>
                                <CardContent>
                                <Typography
                                    variant="h5"
                                    sx={{
                                    textTransform: 'uppercase',
                                    borderBottom: 1,
                                    borderColor: 'grey.200',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontWeight: 'bold',
                                    pb: 1
                                    }}
                                >
                                    <span>Cart Summary</span>
                                </Typography>

                                <Box sx={{ borderBottom: 1, borderColor: 'grey.300', my: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                                    <Typography variant="h6" fontWeight="bold">Subtotal</Typography>
                                    <Typography variant="h4" id="summary_totalamount">
                                        GHS {totalAmount.toFixed(2)}
                                    </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ borderBottom: 1, borderColor: 'grey.300', my: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                                    <Typography variant="h6" fontWeight="bold">Packaging fee</Typography>
                                    <Typography variant="h4" id="packaging_fee">
                                        GHS {packagingFee.toFixed(2)}
                                    </Typography>
                                    </Box>
                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    component={Link}
                                    to={"/order/checkout"}
                                >
                                    Proceed to Checkout
                                </Button>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
                                    Free fast delivery. No order minimum. Exclusive savings. Start your 30-day free trial of Prime.
                                </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </div>
                </div>
            )}
        </main>
    <Footer/>
    </>
  );
};

export default Cart;
