import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../../api/api";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";

const options = {
  modules: [Mousewheel],
  mousewheel: {
    forceToAxis: true,
    sensitivity: 1,
  },
  spaceBetween: 6,
  breakpoints: {
    0: { slidesPerView: 2.2 },
    480: { slidesPerView: 3 },
    768: { slidesPerView: 6 },
    1024: { slidesPerView: 7 },
  },
};

const CategoryBlocks = () => {
  const [sub_categories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true); 




    const fetchData = async () => {
        try {
            const response = await api.get('/api/index/');
            setSubCategories(response.data.subcategories);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return ( 
        <>
        <div className="col-12">
            <div className="heading heading-flex">
                <div className="heading-left ">
                    <h3 className="title ">
                    {loading ? (
                        <Skeleton animation="wave" variant="text" width="100%" />
                    ):(
                        <>
                        Category
                        </>
                    )}
                    </h3>
                </div>
            </div>
        </div>
        <div className="cat-blocks-container">
            <div className="row">
                <Swiper className="owl-theme" {...options}>
                    {loading ? (
                    <SwiperSlide direction="row" spacing={2} style={{ width: '100%' }}>
                        {/* Skeleton for sub-categories */}
                        {[...Array(5)].map((_, i) => (
                        <div key={i} className="skeleton-wrapper">
                            <Skeleton sx={{ borderRadius: '10px' }} animation="wave" variant="rectangular" width={200} height={130} />
                            <Skeleton animation="wave" variant="text" width="60%" />
                        </div>
                        ))}
                    </SwiperSlide>
                    ) : (
                    sub_categories.map((c, i) => (
                        <SwiperSlide key={i} className="category-item">
                        <Link to={`/category/${c.slug}`} className="cat-block">
                            <figure>
                            <span>
                                <img src={`${c.image}`} alt={`${c.title} category`} />
                            </span>
                            </figure>
                            <h3 className="cat-block-title">{c.title}</h3>
                        </Link>
                        </SwiperSlide>
                    ))
                    )}
                </Swiper>
                </div>
        </div>
        </>
    );
};

export default CategoryBlocks;
