import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import api from '../../api/api';
import { SERVER_URL } from '../../api/constants';
import { Link, useParams } from 'react-router-dom';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { truncateText } from '../../utils/Function';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import RecommendedProducts from '../partials/RecommendedProducts';
import RecentlyViewedProducts from '../partials/RecentlyViewedProducts';

const minDistance = 10;

const CategoryProductList = () => {
    const { slug } = useParams();
  const [productsWithRatings, setProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isSizeCollapsed, setIsSizeCollapsed] = useState(true);
  const [value1, setValue1] = useState([20, 36]);

  const [priceRange, setPriceRange] = useState([0, 1000]); // Default range
  const [selectedRange, setSelectedRange] = useState([0, 1000]);
  const location = useLocation();
  const navigate = useNavigate();
  const debounceRef = useRef(null); // For debouncing URL updates
  const [filters, setFilters] = useState({ color: [], size: [], vendor: [], brand: [], rating: [] });
  const [pagination, setPagination] = useState({ next: null, previous: null }); // Pagination state
  const [filterOptions, setFilterOptions] = useState({ colors: [], sizes: [], brands: [], vendors: [], category: {} }); // Filter options

  const handleSliderChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    // Ensure the selected range respects minDistance and bounds
    if (activeThumb === 0) {
      setSelectedRange([Math.min(newValue[0], selectedRange[1] - minDistance), selectedRange[1]]);
    } else {
      setSelectedRange([selectedRange[0], Math.max(newValue[1], selectedRange[0] + minDistance)]);
    }
  };
  

  const [loading, setLoading] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleToggleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarActive((prev) => !prev);
  };

  const handleCloseSidebar = (e) => {
    e.preventDefault();
    setIsSidebarActive(false); // Close sidebar
  };

  useEffect(() => {
    if (isSidebarActive) {
      document.body.classList.add('sidebar-filter-active');
    } else {
      document.body.classList.remove('sidebar-filter-active');
    }
  }, [isSidebarActive]);


  // Fetch products based on slug and URL parameters
  const fetchProducts = async () => {
    const baseUrl = `/api/products/${slug}/`;
    const params = new URLSearchParams(location.search);
    const hasParams = Array.from(params.keys()).length > 0;

    const pageUrl = hasParams ? `${baseUrl}?${params.toString()}` : baseUrl;

    setLoading(true);
    try {
        const response = await api.get(pageUrl);
        const data = response.data;
        console.log(data);
        

        setProducts(data.products_with_details);
        setFilterOptions({
            colors: data.colors,
            sizes: data.sizes,
            brands: data.brands,
            category: data.category,
            vendors: data.vendors,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        setLoading(false);
    }
};

// Fetch products on mount and whenever the location changes
useEffect(() => {
    fetchProducts();
}, [location.search]);

  // Fetch data on mount and filter change
  useEffect(() => {
    fetchProducts();
  }, [location.search]);


  // Handle pagination
  const handlePageChange = (pageUrl) => {
    fetchProducts(pageUrl);
  };
  const productCount = productsWithRatings.length;

// Function to update filters and URL when a checkbox is clicked
// Function to update filter state
const handleFilterChange = (type, id) => {
  setFilters((prevFilters) => {
      const filterIds = prevFilters[type];  // Get the current filter IDs for that type
      if (filterIds.includes(id)) {
          // Remove the ID if it's already selected
          return { ...prevFilters, [type]: filterIds.filter(fId => fId !== id) };
      } else {
          // Add the ID if it's not selected
          return { ...prevFilters, [type]: [...filterIds, id] };
      }
  });
};

const handleClearFilters = (event) => {
  event.preventDefault();

  // Reset filters in state (if you're managing filters in state)
  setFilters({
    color: [],
    size: [],
    brand: [],
    vendor: [],
    rating: [],
  });

  // Clear all URL parameters
  navigate({
    search: ''
  });
};

  // Update filters from URL on initial load or when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const colorFilters = params.getAll('color').map(Number); // Get all color filter values from URL
    const sizeFilters = params.getAll('size').map(Number); // Get all size filter values from URL
    const vendorFilters = params.getAll('vendor').map(Number); // Get all vendor filter values from URL
    const ratingFilters = params.getAll('rating').map(Number); // Get all vendor filter values from URL
    const brandFilters = params.getAll('brand').map(Number); // Get all vendor filter values from URL

    // Set filter state based on URL
    setFilters({
        color: colorFilters || [],
        size: sizeFilters || [],
        vendor: vendorFilters || [],
        rating: ratingFilters || [],
        brand: brandFilters || [],
    });
}, [location.search]);



useEffect(() => {
  // Clear previous timeout if the user is still interacting
  if (debounceRef.current) {
      clearTimeout(debounceRef.current);
  }

  // Debounce the URL update
  debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();

      // Append each filter type to the URL
      for (const [type, ids] of Object.entries(filters)) {
          ids.forEach(id => params.append(type, id));
      }

      // Update the URL with the new filters using navigate
      navigate({ search: params.toString() }, { replace: true });
  }, 300); // Adjust the debounce time as needed (300 ms here)

  // Cleanup the timeout on component unmount
  return () => {
      clearTimeout(debounceRef.current);
  };
}, [filters, navigate]);


  return (
    <>
    <Header/>
        <main className="container">
            <div
                className="page-header text-center"
                style={{ backgroundImage: `url(/page-header-bg.jpg)` }}
            >
                <div className="container">
                  <h1 className="page-title">
                      {filterOptions.category.title} <span>Shop</span>
                  </h1>
                </div>
                {/* End .container */}
            </div>
            {/* End .page-header */}

            <div className="page-content">
            <div className="container">
                <div className="toolbox">
                    <div className="toolbox-left">
                        <a onClick={handleToggleSidebar} className="sidebar-toggler">
                            <FilterListIcon fontSize='large'/>Filters
                        </a>
                    </div>
                    {/* End .toolbox-left */}

                    <div className="toolbox-center">
                        <div className="toolbox-info">
                            <span>{productsWithRatings.length}</span> Product{productsWithRatings.length !== 1 ? 's':''}
                        </div>
                        {/* End .toolbox-info */}
                    </div>
                    {/* End .toolbox-center */}

                    {/* <div className="toolbox-right">
                        <div className="toolbox-sort">
                            <label htmlFor="sortby">Sort by:</label>
                            <div className="select-custom">
                                <select name="sortby" id="sortby" className="form-control">
                                    <option value="popularity" selected="selected">Most Popular</option>
                                    <option value="rating">Most Rated</option>
                                    <option value="date">Date</option>
                                </select>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* End .toolbox */}

                <div className="products">
                  <div className="row">
                      {productCount > 0 ? (
                          productsWithRatings.map((p, index) => (
                              <div key={index} className="col-4 col- col-6 col-xxl-2 col-xl-2 col-sm-4 col-xs-6 col-lg-2 col-md-3 col-md-4 px-1">
                                  <div className="product">
                                      <figure className="product-media">
                                          <Link to={`/${p.product.sku}/${p.product.slug}/`}>
                                              <img src={`${p.product.image}`} alt="Product image" className="product-image" />
                                          </Link>

                                          {/* End .product-action */}
                                      </figure>
                                      {/* End .product-media */}

                                      <div className="product-body">
                                          <div className="product-cat">
                                              <a href="">{p.product.sub_category.title}</a>
                                          </div>
                                          {/* End .product-cat */}
                                          <div className="product-nav product-nav-dots">
                                              {p.colors.map((color, colorIndex) => (
                                                  <Link
                                                      key={colorIndex}
                                                      to={`/${p.product.sku}/${p.product.slug}/`}
                                                      title={color.color__name}
                                                      style={{ background: color.color__code }}
                                                  >
                                                      <span className="sr-only">Color name</span>
                                                  </Link>
                                              ))}
                                          </div>
                                          <h3 className="product-title">
                                              <Link to={`/${p.product.sku}/${p.product.slug}/`}>{truncateText(p.product.title, 30)}</Link>
                                          </h3>
                                          {/* End .product-title */}
                                          <div className="product-price">
                                              <span className="new-price">GHS{(p.product.price).toFixed(2)}</span>
                                              <span className="old-price">Was GHS{(p.product.old_price).toFixed(2)}</span>
                                          </div>
                                          {/* End .product-price */}
                                          <div className="ratings-container">
                                              <Rating name="half-rating-read" value={p.average_rating} precision={0.5} readOnly />
                                              {/* End .ratings */}
                                              <span className="ratings-text">
                                                  ({p.review_count} Review{p.review_count !== 1 ? 's' : ''})
                                              </span>
                                          </div>
                                          {/* End .rating-container */}
                                      </div>
                                      {/* End .product-body */}
                                  </div>
                                  {/* End .product */}
                              </div>
                              // End .col-sm-6 col-lg-4 col-xl-3
                          ))
                      ) : (
                          <div className="text-center">
                              <h2>No <span style={{ color: '#4cb69f' }}>Products</span> Found</h2>
                          </div>
                      )}
                  </div>
                  {/* End .row */}

                  <style>
                      {`
                          .basic-pagination ul li {
                              display: inline-block;
                              
                          }
                          .basic-pagination ul li:not(:last-child) {
                              margin-right: 10px;
                              margin-bottom: 10px;
                          }
                          .basic-pagination ul li a {
                              display: inline-block;
                              width: 40px;
                              height: 40px;
                              line-height: 38px;
                              text-align: center;
                              font-size: 14px;
                              border-radius: 2px;
                              font-weight: 600;
                              background: #f5f5f5;
                              border: 1px solid #e5e5e5;
                          }
                          .basic-pagination ul li a:hover, .basic-pagination ul li a.active {
                              background: #fcbe00;
                              color: #ffffff;
                              border-color: #fcbe00;
                          }
                          .basic-pagination-border {
                              border-top: 1px solid #e6e6e6;
                          }
                      `}
                  </style>

                  <div className="row">
                      {/* Pagination */}
                      <div className="col-xl-12">
                          {/* Add pagination logic as needed */}
                          <ul className="pagination">
                              {/* Example pagination items */}
                              <li className="page-item"><a className="page-link page-link-prev" href="#prev">Prev</a></li>
                              <li className="page-item active"><a className="page-link" href="">1</a></li>
                              <li className="page-item"><a className="page-link" href="#next">Next</a></li>
                          </ul>
                      </div>
                      {/* / */}
                  </div>
                </div>
              {/* End .products */}

              <div onClick={handleCloseSidebar} classNmae="sidebar-filter-overlay"></div>

              <aside className="sidebar-shop sidebar-filter sidebar-filter-active">
                <div className="sidebar-filter-wrapper">
                    <div className="widget widget-clean">
                        <label onClick={handleCloseSidebar}>
                            <CloseIcon fontSize='large' onClick={handleCloseSidebar} />Filters
                        </label>
                        <a
                            href="#"
                            onClick={handleClearFilters}
                            id="clear-filters"
                            className="sidebar-filter-clear"
                        >
                            Clean All
                        </a>
                    </div>
                    {/* End .widget */}

                   
                    {filterOptions.vendors.length > 0 ?
                     <>
                      <Accordion
                        sx={{
                          boxShadow: 'none',    // Remove box shadow
                          border: 'none',       // Remove border
                          '&:before': {
                            display: 'none',    // Remove the default divider line
                          },
                        }}
                        >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                          Vendor
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup>
                          {filterOptions.vendors.map((vendor) => (
                            <FormControlLabel key={vendor.id}
                            control={
                              <Checkbox
                                checked={filters.vendor.includes(vendor.id)}
                                onChange={() => handleFilterChange('vendor', vendor.id)}
                                sx={{
                                  '&.Mui-checked': {
                                    color: 'black', // Custom color for checked checkboxes
                                  },
                                }}
                              />
                            }
                            label={vendor.name}
                            sx={{
                              color:  'black', // Change text color if selected
                              fontWeight: 'bold', // Bold when selected
                            }}
                            />
                          ))}
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Divider />
                    </> : ''}

                    {filterOptions.brands.length > 0 ?
                    <>
                    <Accordion
                      sx={{
                        boxShadow: 'none',    // Remove box shadow
                        border: 'none',       // Remove border
                        '&:before': {
                          display: 'none',    // Remove the default divider line
                        },
                      }}
                      >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        Brand
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                        {filterOptions.brands.map((brand) => (
                          <FormControlLabel key={brand.id}
                          control={
                            <Checkbox
                              // checked={filters.brand.includes(brand.id)}
                              onChange={() => handleFilterChange('brand', brand.id)}
                              sx={{
                                '&.Mui-checked': {
                                  color: 'black', // Custom color for checked checkboxes
                                },
                              }}
                            />
                          }
                          label={brand.title}
                          sx={{
                            color:  'black', // Change text color if selected
                            fontWeight: 'bold', // Bold when selected
                          }}
                          />
                        ))}
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                    <Divider />
                    </> : ''}

                    {filterOptions.sizes.length > 0 ?
                    <>
                      <Accordion
                        sx={{
                          boxShadow: 'none',    // Remove box shadow
                          border: 'none',       // Remove border
                          '&:before': {
                            display: 'none',    // Remove the default divider line
                          },
                        }}
                        >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2-content"
                          id="panel2-header"
                        >
                          Size
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormGroup>
                            {filterOptions.sizes.map((size) => (
                              <FormControlLabel
                                key={size.id}
                                control={
                                  <Checkbox
                                    onChange={() => handleFilterChange('size', size.id)}
                                    checked={filters.size.includes(size.id)}
                                    sx={{
                                      '&.Mui-checked': {
                                        color: 'black', // Custom color for checked checkboxes
                                      },
                                    }}
                                  />
                                }
                                label={size.name}
                                sx={{
                                  color:  'black', // Change text color if selected
                                  fontWeight: 'bold', // Bold when selected
                                }}
                              />
                            ))}
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Divider />
                    </> : ''}

                    {filterOptions.colors.length > 0 ?
                      <>
                        <Accordion
                          sx={{
                            boxShadow: 'none',    // Remove box shadow
                            border: 'none',       // Remove border
                            '&:before': {
                              display: 'none',    // Remove the default divider line
                            },
                          }}
                          >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                          >
                            Color
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="widget-body">
                                  <div className="filter-colors">
                                      {filterOptions.colors.map((color) => (
                                        <a
                                        key={color.id}
                                        data-id={color.id}
                                        title={color.name}
                                        className={`color-link ${filters.color.includes(color.id) ? 'selected': ''}`}
                                        style={{ background: color.code }}
                                        onClick={() => handleFilterChange('color', color.id)}
                                    >
                                        <span className="sr-only">{color.name}</span>
                                    </a>
                                      ))}
                                  </div>
                                  {/* End .filter-colors */}
                              </div>
                              {/* End .widget-body */}
                          </AccordionDetails>
                        </Accordion>
                        <Divider />
                      </> : ''
                    }

                    <Accordion
                      sx={{
                        boxShadow: 'none',    // Remove box shadow
                        border: 'none',       // Remove border
                        '&:before': {
                          display: 'none',    // Remove the default divider line
                        },
                      }}
                      >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                      >
                        Rating
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                checked={filters.rating.includes(5)}
                                  onChange={() => handleFilterChange('rating', 5)}
                                  sx={{
                                    '&.Mui-checked': {
                                      color: 'black', // Custom color for checked checkboxes
                                    },
                                  }}
                                />
                              }
                              label={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Rating name={`rating-1`} value={5} precision={0.5} readOnly sx={{ marginLeft: 1 }}/>
                                  <span></span>
                                </div>
                              }
                              sx={{ color: 'black', fontWeight: 'bold' }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                checked={filters.rating.includes(4)}
                                  onChange={() => handleFilterChange('rating', 4)}
                                  sx={{
                                    '&.Mui-checked': {
                                      color: 'black', // Custom color for checked checkboxes
                                    },
                                  }}
                                />
                              }
                              label={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Rating name={`rating-1`} value={4} precision={0.5} readOnly sx={{ marginLeft: 1 }}/>
                                  <span></span>
                                </div>
                              }
                              sx={{ color: 'black', fontWeight: 'bold' }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                checked={filters.rating.includes(3)}
                                  onChange={() => handleFilterChange('rating', 3)}
                                  sx={{
                                    '&.Mui-checked': {
                                      color: 'black', // Custom color for checked checkboxes
                                    },
                                  }}
                                />
                              }
                              label={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Rating name={`rating-1`} value={3} precision={0.5} readOnly sx={{ marginLeft: 1 }}/>
                                  <span></span>
                                </div>
                              }
                              sx={{ color: 'black', fontWeight: 'bold' }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filters.rating.includes(2)}
                                  onChange={() => handleFilterChange('rating', 2)}
                                  sx={{
                                    '&.Mui-checked': {
                                      color: 'black', // Custom color for checked checkboxes
                                    },
                                  }}
                                />
                              }
                              label={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Rating name={`rating-1`} value={2} precision={0.5} readOnly sx={{ marginLeft: 1 }}/>
                                  <span></span>
                                </div>
                              }
                              sx={{ color: 'black', fontWeight: 'bold' }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filters.rating.includes(1)}
                                  onChange={() => handleFilterChange('rating', 1)}
                                  sx={{
                                    '&.Mui-checked': {
                                      color: 'black', // Custom color for checked checkboxes
                                    },
                                  }}
                                />
                              }
                              label={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Rating name={`rating-1`} value={1} precision={0.5} readOnly sx={{ marginLeft: 1 }}/>
                                  <span></span>
                                </div>
                              }
                              sx={{ color: 'black', fontWeight: 'bold' }}
                            />
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                    <Divider />

                    <Accordion
                      sx={{
                        boxShadow: 'none',    // Remove box shadow
                        border: 'none',       // Remove border
                        '&:before': {
                          display: 'none',    // Remove the default divider line
                        },
                      }}
                      >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                      >
                        Price Range
                      </AccordionSummary>
                        <AccordionDetails>
                          <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={selectedRange}
                            min={priceRange[0]}
                            max={priceRange[1]}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={(value) => `${value} GHS`}
                            // disableSwap
                            sx={{
                              color:  'black', // Change text color if selected
                              fontWeight: 'bold', // Bold when selected
                            }}
                          />
                          <Typography>
                            Selected Range: GHS{selectedRange[0]} - GHS{selectedRange[1]}
                          </Typography>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 2 }}
                            >
                            Apply Filter
                          </Button>
                        </AccordionDetails>
                    </Accordion>
                    <Divider />



                </div>
              </aside>

            </div>
            {/* End .container */}

            <RecentlyViewedProducts/>

            <RecommendedProducts/>

            </div>

        </main>
    <Footer/>
    </>
  );
};

export default CategoryProductList;
