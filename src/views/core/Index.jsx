import React, { useEffect, useState } from "react";
import MainCarousel from "../partials/Carousel";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import api from "../../api/api";
import SideBanners from "./SideBanners";
import CategoryBlocks from "./CategorySlider";
import ProductCarousel from "../partials/ProductCarousel";
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import { Card, CardMedia, CardContent, Typography, Skeleton } from '@mui/material';
import { truncateText } from '../../utils/Function';
import RecommendedProducts from "../partials/RecommendedProducts";
import { SERVER_URL } from '../../api/constants/';


const Index = () => {
    const [category, setCategory] = useState([]);
    const [main, setMainCategory] = useState([]);
    const [subCat, setSubCat] = useState([]);
    const [loading, setLoading] = useState(true);

    const [viewedProducts, setViewedProducts] = useState([]);
    const limitedViewedProducts = viewedProducts.slice(0, 4);    

    async function fetchViewedProducts() {
        setLoading(true);
        try {
            const response = await api.get('/api/viewed-products/');
            setViewedProducts(response.data.recently_viewed || []);
        } catch (error) {
            console.error("Error fetching viewed products:");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchViewedProducts();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/api/index/');            
            setCategory(response.data.category_data);
            setSubCat(response.data.sub_data);
            setMainCategory(response.data.main);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    

  return (
    <>
    <Header/>
        <main className="container">
            <div className="intro-section pt-3 pb-3 mb-2">
                <div className="container">
                    <div className="row">
                        {/* Main Slider Carousel */}
                        <div className="col-lg-8">
                            <div className="intro-slider-container slider-container-ratio  mb-3 mb-lg-0">
                                <div className="intro-slider">
                                    <MainCarousel />
                                </div>
                            </div>
                        </div>
                        {/* End Main Slider Carousel */}

                        
                        {/* Left Side bar */}
                        <div className="col-lg-4 d-none d-md-block">
                            <SideBanners/>
                        </div>
                        {/* End Left Side bar */}
                        <Divider />
                    </div>

                    <Grid container spacing={2} >
                        {/* First Row */}
                        {viewedProducts.length > 0 ? (
                            <Grid sx={{ boxShadow: 'none', border: 'none', }} size={{ xs: 12, md: 3, lg: 3 }}>
                                <Card sx={{ boxShadow: 'none', border: 'none',  }}>
                                    <CardContent>
                                        <Typography sx={{ fontWeight: 'bold', mb: 2 }} variant="h5">
                                            Your Browsing History
                                        </Typography>
                                        <Grid container spacing={0.5}>
                                            {loading ? (
                                                // Show skeletons while loading
                                                Array.from(new Array(4)).map((_, index) => (
                                                    <Grid size={{ xs: 6, md: 6 }} key={index}>
                                                        <Skeleton sx={{ borderRadius: '10px' }} animation="wave" variant="rectangular" width="100%" height='100%' />
                                                        <Skeleton animation="wave" variant="text" />
                                                    </Grid>
                                                ))
                                            ) : (
                                                // Show actual products after loading
                                                limitedViewedProducts.map((p) => (
                                                    <Grid size={{ xs: 6, md: 6 }} key={p.id}>
                                                        <Link to={`/${p.slug}/${p.id}/${p.sub_category.slug}`} style={{ textDecoration: 'none' }}>
                                                            <CardMedia
                                                                component="img"
                                                                image={`${p.image}`}
                                                                alt={p.title}
                                                            />
                                                            <Typography variant="body2" align="center">
                                                                {truncateText(p.title, 28)}
                                                            </Typography>
                                                        </Link>
                                                    </Grid>
                                                ))
                                            )}
                                        </Grid>
                                        <Link to={"/user/dashboard/recently-viewed-products"}>See all</Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ): (<></>)}

                        {/* Second Row */}
                        <Grid sx={{ boxShadow: 'none', border: 'none',  }} size={{ xs: 12, md: 3, lg: 3 }}>
                            <Card sx={{ boxShadow: 'none', border: 'none',  }}>
                                <CardContent>
                                <Typography sx={{fontWeight: 'bold', mb: 2}} variant="h5">{main?.title}</Typography>
                                <Grid container spacing={1}>
                                    {subCat.map((c) =>(
                                        <Grid size={{ xs: 6, md: 6 }}>
                                            <Link to={`/category/${c.slug}`} style={{ textDecoration: 'none' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    image={`${c.image}`}
                                                    alt="Makeup"
                                                />
                                                <Typography variant="body2" align="center">{c.title}</Typography>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Link to={``}>Shop all</Link>
                                </CardContent>
                            </Card>

                        </Grid>
                        {/* Third Row */}
                        <Grid sx={{ boxShadow: 'none', border: 'none',  }} size={{ xs: 12, md: 3, lg: 3 }}>
                            <Card sx={{ boxShadow: 'none', border: 'none',  }}>
                                <CardContent>
                                <Typography sx={{fontWeight: 'bold', mb: 2}} variant="h5">Level up your beauty</Typography>
                                <Grid container spacing={1}>
                                    <Grid size={{ xs: 6, md: 6 }}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image="https://i.pinimg.com/236x/38/83/ff/3883ff333521d9b334b2ef4f6aeecbc5.jpg"
                                        alt="Makeup"
                                    />
                                    <Typography variant="body2" align="center">Makeup</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6, md: 6 }}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image="https://i.pinimg.com/236x/8c/9d/6f/8c9d6f64493b461fc9fe4bffe3de4819.jpg"
                                        alt="Makeup"
                                    />
                                    <Typography variant="body1" align="center">Makeup</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6, md: 6 }}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image="https://i.pinimg.com/236x/78/22/57/782257fc716fe7dace96792c30dc3586.jpg"
                                        alt="Makeup"
                                    />
                                    <Typography variant="body1" align="center">Makeup</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6, md: 6 }}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image="https://i.pinimg.com/236x/0b/b2/57/0bb25779f1c80f75af34afa902850623.jpg"
                                        alt="Makeup"
                                    />
                                    <Typography variant="body1" align="center">Makeup</Typography>
                                    </Grid>

                                    
                                </Grid>
                                <Link href="#">See more</Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {category && (
                    <Grid sx={{mt: 3, bgcolor: 'white', p: 2}} container spacing={2}>
                        {category.map((c) => (
                        <Grid key={c.id} size={{ xs: 6, md: 3, lg: 3 }}>
                            <div style={{borderRadius: 10, paddingBottom: 0}} className="banner">
                                <Link to={`/s/${c.slug}/${c.main_category.slug}`}>
                                    <img style={{borderRadius: 10, opacity: '85%'}} src={`${c.main_image}`} alt="Banner" />
                                </Link>

                                <div className="banner-content">
                                    <Typography sx={{p: 0.3, bgcolor: 'whitesmoke', borderRadius: '2px' }} variant="h5" align="center">{c.title}</Typography>
                                    <Link to={`/s/${c.slug}/${c.main_category.slug}`} className="banner-link">Click here</Link>
                                </div>
                            </div>

                        </Grid>
                        ))}
                    </Grid>
                    )}

                    <RecommendedProducts/>

                    {/* Category Slider Section */}
                    <div className="container mt-1">
                        <CategoryBlocks/>
                    </div>
                    {/* Category Slider Section */}

                    {/* Product Carousel Section */}
                    <ProductCarousel/>
                    {/* End Product Carousel Section */}

                </div>
                
            </div>
            <button id="scroll-top" title="Back to Top"><i className="icon-arrow-up"></i></button>

        </main>
    <Footer /> 
    </>

  );
};

export default Index;
