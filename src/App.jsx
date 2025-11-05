
import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PrivateRoute from './api/PrivateRoute.jsx';
import { CartProvider } from './utils/CartContext.jsx';

import Register from './views/authentication/Register.jsx';
import Login from './views/authentication/Login.jsx';
import Logout from './views/authentication/Logout.jsx';

import PasswordForm from './views/authentication/PasswordForm.jsx';
import ChangePassword from './views/authentication/ChangePassword.jsx';
import ForgotPassword from './views/authentication/ForgotPasswordForm.jsx';
import LoginForm from './views/authentication/LoginForm.jsx';
import OtpVerification from './views/authentication/otpVerification.jsx';
import MainWrapper from "./layouts/MainWrapper";
import ProductDetail from './views/core/ProductDetail.jsx';
import Cart from './views/core/CartPage.jsx';

import AddressPage from './views/dashboard/Address.jsx';
import UserDashboard from './views/dashboard/Dashboard.jsx';
import Index from './views/core/Index.jsx';
// import AddressForm from './views/dashboard/AddAddress.jsx';
import AddAdress from './views/dashboard/AddAddress.jsx';
import EditAddress from './views/dashboard/EditAddress.jsx';
import CheckoutPage from './views/checkout/CheckOutPage.jsx';
import Checkout from './views/checkout/Mine.jsx';
import CategoryProductList from './views/core/CategoryProductList.jsx';
import BrandProductList from './views/core/BrandProductList.jsx';
import SearchProductList from './views/core/SearchProductList.jsx';
import SellerDetail from './views/vendor/SellerDetail.jsx';
import SubCategoryList from './views/category/SubCategoryList.jsx';

import VendorDashboard from './views/vendor/Main.jsx';
import VendorMessage from './views/vendor/messages/Main.tsx';
import VendorProfile from './views/vendor/profile/Main.tsx';
import ProductForm from './views/vendor/product/AddEditProducts.jsx';
import EditProduct from './views/vendor/product/EditProduct.jsx';
import ProductList from './views/vendor/product/Main.jsx';
import Dashboard from './views/vendor/dashboard/Dashboard.jsx';
import VendorOrders from './views/vendor/orders/Main.jsx';
import VendorOrderDetail from './views/vendor/orders/OrderDetailMain.jsx';
import VendorReviews from './views/vendor/reviews/Main.jsx';
import OpeningHours from './views/vendor/openingHour/Main.jsx';
import SellerGuide from './views/vendor/sellerGuide/Main.jsx';
import SellerSignUpPage from './views/vendor/sellerGuide/SellerSignUp.jsx';
import PaymentMethod from './views/vendor/payment/Main.jsx';
import UserProfile from  './views/dashboard/profile/Main.tsx';
import CustomerOrders from  './views/dashboard/orders/Main.jsx';
import CustomerOrderDetail from  './views/dashboard/orders/OrderDetailMain.jsx';
import CustomerLogout from  './views/dashboard/sign-out/Main.jsx';
import CustomerReviews from  './views/dashboard/review/Main.jsx';
import RecentlyViewedProducts from  './views/dashboard/recentproduct/Main.jsx';
import PasswordManagement from  './views/dashboard/password/Main.jsx';


const App = () => {

  return (
    <>
   
      <BrowserRouter>
        <MainWrapper>
          <CartProvider>
              <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/auth/reset" element={<ForgotPassword />} />
                  <Route path="/auth/email" element={<LoginForm />} />
                  <Route path="/auth/reset-password" element={<ChangePassword />} />
                  <Route path="/auth/password" element={<PasswordForm />} />
                  <Route path="/auth/verify" element={<OtpVerification />} />

                  <Route path="/order/cart" element={<Cart/>} />
                  
                  <Route path="/:sku/:slug" element={<ProductDetail/>} />

                  <Route element={<PrivateRoute />}>
                    {/* User Dashboard */}
                    <Route path="/user/dashboard/address" element={<AddressPage/>} />
                    <Route path="/user/dashboard/address/add" element={<AddAdress/>} />
                    <Route path="/user/dashboard/address/:id/change" element={<EditAddress/>} />
                    <Route path="/user/dashboard/profile" element={<UserProfile/>} />
                    <Route path="/user/dashboard/orders" element={<CustomerOrders/>} />
                    <Route path="/user/dashboard/order/:id" element={<CustomerOrderDetail/>} />
                    <Route path="/user/dashboard/password-management" element={<PasswordManagement/>} />
                    <Route path="/user/dashboard/sign-out" element={<CustomerLogout/>} />
                    <Route path="/user/dashboard/reviews" element={<CustomerReviews/>} />
                    <Route path="/user/dashboard/recently-viewed-products" element={<RecentlyViewedProducts/>} />
                  </Route>

                  <Route path="/user/dashboard" element={<UserDashboard/>} />
                  {/* User Dashboard */}


                  {/* Seller page */}
                  <Route path="/seller/:slug" element={<SellerDetail/>} />
                  <Route path="/seller/get-started" element={<SellerGuide/>} />
                  <Route path="/seller/auth/signup" element={<SellerSignUpPage/>} />
                  <Route path="/vendor/dashboard" element={<VendorDashboard/>} />
                  <Route path="/vendor/order/:id" element={<VendorOrderDetail/>} />
                  <Route path="/vendor/orders" element={<VendorOrders/>} />
                  <Route path="/vendor/messages" element={<VendorMessage/>} />
                  <Route path="/vendor/profile" element={<VendorProfile/>} />
                  <Route path="/vendor/reviews" element={<VendorReviews/>} />
                  <Route path="/vendor/opening-hours" element={<OpeningHours/>} />
                  <Route path="/vendor/payment-method" element={<PaymentMethod/>} />

                  <Route path="/vendor/product/change/:productId" element={<EditProduct/>} />
                  <Route path="/vendor/addproduct" element={<ProductForm/>} />
                  <Route path="/vendor/products" element={<ProductList/>} />
                  <Route path="/vendor" element={<Dashboard/>} />
                  {/* <Route path="/vendor/products" element={<SellerProducts/>} /> */}
                  {/* seller page */}

                  {/* Category page */}
                  <Route path="/s/:slug/:category" element={<SubCategoryList />} />
                  {/* Category page */}

                  {/* Add a fallback route */}
                  <Route path="/category/:slug" element={<CategoryProductList />} />
                  <Route path="/brand/:slug" element={<BrandProductList />} />
                  <Route path="/search/" element={<SearchProductList />} /> 
                  {/* Add a fallback route */}

                  {/* Add a fallback route */}
                  {/* <Route path="*" render={() => <h1>404 - Page not found</h1>} /> */}
                  <Route path="*" element={<h1>404 - Page not found</h1>} />

                  {/* <Route path="/" element={<Index />} /> */}
                  {/* Private Routes */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/order/checkout" element={<Checkout/>} />
                    <Route path="/delivery/option" element={<CheckoutPage/>} />
                  </Route>

              </Routes>
          </CartProvider>
        </MainWrapper>
      </BrowserRouter>
    </>
  )
}

export default App
