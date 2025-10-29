import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../../api/api";
import { SERVER_URL } from '../../api/constants';
import { Skeleton, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import { truncateText } from '../../utils/Function'; // Adjust the path if needed
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

const RecommendedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 

    const fetchData = async () => {
        try {
            const response = await api.get('/api/recommended-products/');
            setProducts(response.data.recommended_products);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
          setLoading(false);
        }
    };

    useEffect(() => {
      fetchData();
    }, []);


  return (
    <>
      {products && products.length > 0 && (
        <div>
          <div className="heading heading-flex my-1">
            <div className="col-12">
              <div className="heading heading-flex">
                <div className="heading-left">
                  <h2 className="title">
                    {loading ? (
                      <Skeleton animation="wave" variant="text" width="100%" />
                    ) : (
                      <>Recommended products</>
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <Swiper className="owl-theme" {...options}>
            {loading ? (
              <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                {/* Skeleton for products */}
                {[...Array(7)].map((_, i) => (
                  <SwiperSlide key={i} className="product-skeleton">
                    <Skeleton
                      sx={{ borderRadius: '10px' }}
                      animation="wave"
                      variant="rectangular"
                      width={150}
                      height={210}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="60%"
                      style={{ marginTop: '8px' }}
                    />
                    <Skeleton animation="wave" variant="text" width="40%" />
                    <Skeleton animation="wave" variant="text" width="50%" />
                  </SwiperSlide>
                ))}
              </Stack>
            ) : (
              products.map((p) => (
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
              ))
            )}
          </Swiper>
          {/* <div className="mb-5"></div> */}
        </div>
      )}
    </>

  )
}

export default RecommendedProducts
