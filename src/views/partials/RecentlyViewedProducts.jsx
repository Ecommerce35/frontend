import React, { useEffect, useState } from 'react'
import { Skeleton, Stack } from '@mui/material';
import { truncateText } from '../../utils/Function'; // Adjust the path if needed
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";
import { Link } from 'react-router-dom';

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

const RecentlyViewedProducts = () => {
    const [viewedProducts, setViewedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchViewedProducts() {
        try {
            const response = await api.get('/api/viewed-products/');
            setViewedProducts(response.data.recently_viewed || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching viewed products:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchViewedProducts();
    }, []);



  return (
    <div>
    {viewedProducts.length > 0 && (
        <div className='container'>
            <div className="heading heading-flex my-1">
                <div className="col-12">
                    <div className="heading heading-flex">
                        <div className="heading-left">
                            <h2 className="title">
                                {loading ? (
                                    <Skeleton animation="wave" variant="text" width="100%" height={30} />
                                ) : (
                                    <>Browsing history</>
                                )}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                    {/* Skeleton loader for each product */}
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="product-skeleton">
                            <Skeleton
                                sx={{ borderRadius: '10px' }}
                                animation="wave"
                                variant="rectangular"
                                width={150}
                                height={210}
                            />
                            <Skeleton animation="wave" variant="text" width="60%" style={{ marginTop: '8px' }} />
                            <Skeleton animation="wave" variant="text" width="40%" />
                            <Skeleton animation="wave" variant="text" width="50%" />
                        </div>
                    ))}
                </Stack>
            ) : (
                <Swiper className="owl-theme" {...options}>
                    {viewedProducts.map((p) => (
                        <SwiperSlide key={p.id} className="product">
                            <figure className="product-media">
                                <Link to={`/${p.sku}/${p.slug}`}>
                                    <img
                                        src={`${p.image}`}
                                        alt="Product"
                                        className="product-image"
                                    />
                                </Link>
                            </figure>

                            <div className="product-body">
                                <h3 className="product-title">
                                    <Link to={`/${p.sku}/${p.slug}`}>
                                        {truncateText(p.title, 21)}
                                    </Link>
                                </h3>
                                <div className="product-price">GHS{p.price.toFixed(2)}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            <div className="mb-5"></div>
        </div>
    )}
    </div>

  )
}

export default RecentlyViewedProducts
