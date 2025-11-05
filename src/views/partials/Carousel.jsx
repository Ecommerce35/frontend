// BannerCarousel.js
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as Slider } from 'react-responsive-carousel';

import Skeleton from '@mui/material/Skeleton';


const MainCarousel = () => {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // Fetch data from Django backend using Axios
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await api.get('/api/index/');
                setSliders(response.data.sliders);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
    
  const settings = {
    renderIndicator: false,
    infiniteLoop: true,
    autoPlay: true,
    showStatus: false,
    stopOnHover: true,
    swipeable: true, 
    interval: 10000, 
    showThumbs: false,
    
  };


  return (
    <>
       <Slider {...settings}>
            {/* Conditionally render the skeleton loader while loading */}
            {loading
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className="intro-slide">
                    {/* Skeleton for the image */}
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={350} />
                    </div>
                ))
                : sliders.map((s, i) => (
                    <div key={i} className="intro-slide">
                    <figure className="slide-image">
                        <picture>
                        <source media="(max-width: 880px)" srcSet={`${s.image}`} />
                        <img src={`${s.image}`} className="" alt="Image Desc" />
                        </picture>
                    </figure>

                    {/* Content overlay like text or buttons */}
                    <div className="intro-content">
                        <h3 className="intro-subtitle text-primary">Daily Deals</h3>
                        <h1 className="intro-title">
                        AirPods <br />Earphones
                        </h1>

                        <div className="intro-price">
                        <sup>Today:</sup>
                        <span className="text-primary">
                            $247<sup>.99</sup>
                        </span>
                        </div>

                        <a href="category.html" className="btn btn-primary btn-round">
                        <span>Click Here</span>
                        <i className="icon-long-arrow-right"></i>
                        </a>
                    </div>
                    </div>
                ))}
            </Slider>
    </>
  );
};

export default MainCarousel;
