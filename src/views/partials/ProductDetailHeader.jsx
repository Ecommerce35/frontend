import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../api/authStore';
import useUserData from '../../api/userData';
import { getTotalCartQuantity, postSearchedProducts } from '../../utils/CartFunctions';
import { useCart } from '../../utils/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CallIcon from '@mui/icons-material/Call';
import ReverseGeocodeLocation from "./Location";
import BasicModal from './Modal';
import { SERVER_URL } from '../../api/constants';



const ProductDetailHeader = () => {
    const { cartCount } = useCart(); 
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuthStore();
    const { userData, loading, error } = useUserData();
    const [totalQuantity, setTotalQuantity] = useState(0);

    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('search_history')) || [];
        setSearchHistory(storedHistory);
    }, []);

    // Function to update search history
    const updateSearchHistory = (query) => {
    let history = [...searchHistory];
    if (history.includes(query)) {
        history = history.filter(item => item !== query); // Remove duplicate queries
    }
    history.unshift(query); // Add query to the top of the history
    if (history.length > 10) {
        history = history.slice(0, 10); // Limit history to top 10 items
    }


    setSearchHistory(history);
        localStorage.setItem('search_history', JSON.stringify(history)); // Save history to localStorage
    };

    const handleSearch = (e) => {
        e.preventDefault()
        if (query.trim()) {
        updateSearchHistory(query);  // Update search history
        postSearchedProducts()
        navigate(`/search/?q=${query}`);
        }
    };

    const fetchTotalQuantity = async () => {
      const quantity = await getTotalCartQuantity();
      setTotalQuantity(quantity);
    };
    
    useEffect(() => {
        fetchTotalQuantity();
    }, []);

    const handleLogout = async () => {
        navigate('/user/dashboard/sign-out'); // Redirect to logout or home page
    };

  return (
    <header className="header header-intro-clearance header-4">
        <div className="header-top">
            <div className="container">
            <div className="header-left">
                <ReverseGeocodeLocation />
            </div>
                {/* End .header-left */}

                <div className="header-right">
                    <ul className="top-menu">
                        <li>
                            <a href="#">Links</a>
                            <ul>
                                <li>
                                    <div className="header-dropdown">
                                        <select
                                            style={{ border: 'none', backgroundColor: '#fff' }}
                                            id="currency-select"
                                            onChange={(e) => changeCurrency(e.target.value)}
                                        >
                                            <option selected value="GHS">GHS</option>
                                            <option value="USD">USD</option>
                                            <option  value="EUR">EUR</option>
                                            {/* Add more options for other currencies as needed */}
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="header-dropdown">
                                        <a href="#">English</a>
                                    </div>
                                </li>
                                <li>
                                    {isLoggedIn ? (
                                        <>
                                            <a className="cursor-pointer" onClick={handleLogout} >Logout</a>
                                        </>

                                    ):(
                                        <>
                                            <Link to={"/auth/email"}>Sign in / Sign up</Link>
                                        </>
                                    )}
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/* End .top-menu */}
                </div>
                {/* End .header-right */}
            </div>
            {/* End .container */}
        </div>
    {/* End .header-top */}

    <div className="header-middle shadow-sm">
        <div className="container">
            <div className="header-left">
                <button className="mobile-menu-toggler">
                    <span className="sr-only">Toggle mobile menu</span>
                    <MenuIcon fontSize='large'/>
                </button>

                <Link to={"/"} className="logo">
                    <img src={`${SERVER_URL}/static/assetss/images/demos/demo-4/logo.png`} alt="Molla Logo" width="105" height="25" />
                </Link>
            </div>
            {/* End .header-left */}

            <div className="col-xl-5 col-lg-4 d-none d-lg-block">
                <div className="header__search">
                    <form onSubmit={handleSearch}>
                        <div className="header__search-box">
                            <input name="q" onChange={(e) => setQuery(e.target.value)} value={query} className="search-input search-input-2" placeholder={ "I'm shopping for..."} />
                            <button type="submit" className="button button-2 button-3">
                                <SearchIcon fontSize='med'/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="header-right">
                <div className="dropdown compare-dropdown">
                    <a href="#" className="dropdown-toggle d-lg-none" title="Search" aria-label="Compare Products">
                        <div className="icon">
                            <SearchIcon fontSize='meduim'/>
                        </div>
                        <p></p>
                    </a>
                </div>
                {/* End .compare-dropdown */}

                <div className="wishlist">
                    <Link to={"/user/dashboard"} title="Account">
                        <div className="icon">
                            <PersonIcon/>
                            <span className="wishlist-count badge">3</span>
                        </div>
                        <p title="Dashboard">
                            {userData
                                ? `Hello, ${userData.first_name}`
                                : 'Login!'}
                        </p>
                    </Link>
                </div>
                {/* End .wishlist */}

                <div className="dropdown cart-dropdown">
                    <Link to={'/order/cart'} className="dropdown-toggle" >
                        <div className="icon">
                            <ShoppingCartIcon />
                            <span id="cart_count" className="cart-count">{cartCount}</span>
                        </div>
                        <p>Cart</p>
                    </Link>
                </div>
                {/* End .cart-dropdown */}
            </div>
            {/* End .header-right */}
        </div>
        {/* End .container */}
    </div>
    {/* End .header-middle */}


    <div className="header-bottom sticky-header">
        <div className="container">
            <div className="header-left">
                <div className="dropdown category-dropdown">
                    <a
                        href="#"
                        className="dropdown-toggle"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        title="Browse Categories"
                    >
                        Browse Categories <i className="icon-angle-down"></i>
                    </a>
                </div>
                {/* End .category-dropdown */}
            </div>
            {/* End .header-left */}

            <div className="header-center">
                <nav className="main-nav">
                    <ul className="menu sf-arrows">
                        <li className="megamenu-container active">
                            <a href="index.html" className="sf-with-ul">Home</a>
                        </li>
                        <li>
                            <a href="category.html" className="sf-with-ul">Shop</a>
                        </li>
                        <li>
                            <a href="product.html" className="sf-with-ul">Product</a>
                            <div className="megamenu megamenu-sm">
                                <div className="row no-gutters">
                                    <div className="col-md-6">
                                        <div className="menu-col">
                                            <div className="menu-title">Product Details</div>
                                            <ul>
                                                <li><a href="product.html">Default</a></li>
                                                <li><a href="product-centered.html">Centered</a></li>
                                                <li>
                                                    <a href="product-extended.html">
                                                        <span>
                                                            Extended Info <span className="tip tip-new">New</span>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li><a href="product-gallery.html">Gallery</a></li>
                                                <li><a href="product-sticky.html">Sticky Info</a></li>
                                                <li><a href="product-sidebar.html">Boxed With Sidebar</a></li>
                                                <li><a href="product-fullwidth.html">Full Width</a></li>
                                                <li><a href="product-masonry.html">Masonry Sticky Info</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* End .col-md-6 */}

                                    <div className="col-md-6">
                                        <div className="banner banner-overlay">
                                            <a href="category.html">
                                                <img
                                                    src="assets/images/menu/banner-2.jpg"
                                                    alt="Banner"
                                                />
                                                <div className="banner-content banner-content-bottom">
                                                    <div className="banner-title text-white">
                                                        New Trends<br />
                                                        <span>
                                                            <strong>spring 2019</strong>
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    {/* End .col-md-6 */}
                                </div>
                                {/* End .row */}
                            </div>
                            {/* End .megamenu megamenu-sm */}
                        </li>
                        <li>
                            <a href="#" className="sf-with-ul">Pages</a>
                            <ul>
                                <li>
                                    <a href="about.html" className="sf-with-ul">About</a>
                                    <ul>
                                        <li><a href="about.html">About 01</a></li>
                                        <li><a href="about-2.html">About 02</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="contact.html" className="sf-with-ul">Contact</a>
                                    <ul>
                                        <li><a href="contact.html">Contact 01</a></li>
                                        <li><a href="contact-2.html">Contact 02</a></li>
                                    </ul>
                                </li>
                                <li><a href="login.html">Login</a></li>
                                <li><a href="faq.html">FAQs</a></li>
                                <li><a href="404.html">Error 404</a></li>
                                <li><a href="coming-soon.html">Coming Soon</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="blog.html" className="sf-with-ul">Blog</a>
                        </li>
                        <li>
                            <a href="elements-list.html" className="sf-with-ul">Elements</a>
                            <ul>
                                <li><a href="elements-products.html">Products</a></li>
                                <li><a href="elements-typography.html">Typography</a></li>
                                <li><a href="elements-titles.html">Titles</a></li>
                                <li><a href="elements-banners.html">Banners</a></li>
                                <li><a href="elements-product-category.html">Product Category</a></li>
                                <li><a href="elements-video-banners.html">Video Banners</a></li>
                                <li><a href="elements-buttons.html">Buttons</a></li>
                                <li><a href="elements-accordions.html">Accordions</a></li>
                                <li><a href="elements-tabs.html">Tabs</a></li>
                                <li><a href="elements-testimonials.html">Testimonials</a></li>
                                <li><a href="elements-blog-posts.html">Blog Posts</a></li>
                                <li><a href="elements-portfolio.html">Portfolio</a></li>
                                <li><a href="elements-cta.html">Call to Action</a></li>
                                <li><a href="elements-icon-boxes.html">Icon Boxes</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* End .header-center */}

            <div className="header-right">
                <i className="la la-lightbulb-o"></i>
                <p>Clearance<span className="highlight">&nbsp;Up to 30% Off</span></p>
            </div>
        </div>
        {/* End .container */}             
    </div>
    {/* End .header-bottom */}

    </header>
  )
}

export default ProductDetailHeader
