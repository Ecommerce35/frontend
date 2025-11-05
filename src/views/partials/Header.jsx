import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../api/authStore";
import useUserData from "../../api/userData";

import { Link } from 'react-router-dom';
import { getTotalCartQuantity, postSearchedProducts } from '../../utils/CartFunctions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router-dom';

import { useCart } from "../../utils/CartContext";


function Header() {
    const { cartCount } = useCart(); 
    const navigate = useNavigate();
    // const [isLoggedIn, user] = useAuthStore((state) => [state.isLoggedIn, state.user]);
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
    const updateSearchHistory = async (query) => {
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
        await postSearchedProducts();
    };

    const handleSearch = (e) => {
        e.preventDefault()
        if (query.trim()) {
        updateSearchHistory(query);  // Update search history
        navigate(`/search/?q=${query}`);
        }
    };

    // useEffect(() => {
    //     const fetchTotalQuantity = async () => {
    //       const quantity = await getTotalCartQuantity();
    //       setTotalQuantity(quantity);
    //     };
    
    //     fetchTotalQuantity();
    // }, []);

    const handleLogout = async () => {
        navigate('/user/dashboard/sign-out'); // Redirect to logout or home page
    };

    return (

        <header className="header header-intro-clearance header-4">
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        {/* <ReverseGeocodeLocation /> */}
                    </div>

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
                                                value="GHS"
                                                onChange={() => {}}
                                                >
                                                <option value="GHS">GHS</option>
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="header-dropdown">
                                            <a href="#" >English</a>
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
                    </div>
                </div>
            </div>

            <div className="header-middle shadow-sm">
                <div className="container">
                    <div className="header-left">
                        <button className="mobile-menu-toggler">
                            <span className="sr-only">Toggle mobile menu</span>
                            <MenuIcon fontSize="med"/>
                        </button>

                        <Link to={"/"} className="logo">
                            <img src="assetss/images/demos/demo-4/logo.png" alt="Logo" width="105" height="25" />
                        </Link>
                    </div>

                    <div className="col-xl-5 col-lg-4 d-none d-lg-block">
                        <div className="header__search">
                            <form onSubmit={handleSearch}>
                                <div className="header__search-box">
                                    <input name="q" onChange={(e) => setQuery(e.target.value)} value={query} className="search-input search-input-2" placeholder="I'm shopping for..." />
                                    <button type="submit" className="button button-2 button-3"><SearchIcon fontSize="large"/></button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="dropdown compare-dropdown">
                            <a href="#" className="dropdown-toggle d-lg-none" title="Search" aria-label="Compare Products">
                                <div className="icon">
                                    <SearchIcon fontSize=""/>
                                </div>
                                <p></p>
                            </a>
                        </div>

                        <div className="wishlist">
                            <Link to={"/user/dashboard"} title="Account">
                                <div className="icon">
                                    <PersonIcon />
                                    <span className="wishlist-count badge">3</span>
                                </div>
                                <p title="Dashboard">
                                    {userData
                                        ? `Hello, ${userData.first_name}`
                                        : 'Login!'}
                                </p>
                            </Link>
                        </div>

                        <div className="dropdown cart-dropdown">
                            <Link to={'/order/cart'} className="dropdown-toggle">
                                <div className="icon">
                                    <ShoppingCartIcon/>
                                    <span id="cart_count" className="cart-count">{cartCount}</span> {/* Replace with actual cart count */}
                                </div>
                                <p>Cart</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom sticky-header">
                <div className="container">
                    <div className="header-left">
                        <div className="dropdown category-dropdown ">
                            <a href="#" className="dropdown-toggle" title="Browse Categories">
                                Browse Categories <i className="icon-angle-down"></i>
                            </a>

                            <div className="dropdown-menu ">
                                <nav className="side-nav">
                                    <ul className="menu-vertical sf-arrows">
                                        <li className="item-lead"><a href="#">Daily offers</a></li>
                                        <li className="item-lead"><a href="#">Gift Ideas</a></li>
                                        <li><a href="#">Beds</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="header-center">
                        <nav className="main-nav">
                            <ul className="menu sf-arrows">
                                <li className="megamenu-container active">
                                    <a to="/" className="sf-with-ul">Home</a>

                                    <div className="megamenu demo">
                                        {/* Your megamenu content */}
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </header>

    );
}

export default Header;
