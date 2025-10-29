import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../../api/api";
import { Skeleton } from '@mui/material';
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

const ProductCarousel = ({
  title = "Products",
  fetchUrl,
  extractor = (data) => data?.products || data?.recommended_products || data?.suggested || data || [],
}) => {
  // const axiosClient = createAxiosClient();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fetchUrl) fetchData();
  }, [fetchUrl]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get(fetchUrl);
      const extracted = extractor(res.data);
      setProducts(extracted);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!loading && products.length === 0) {
    return null;
  };


  return (
      <div>
        <div className="heading heading-flex mb-2">
        <div className="col-12">
          <div className="heading heading-flex">
              <div className="heading-left">
                <h2 className="title">
                  {loading ? (
                    <Skeleton animation="wave" variant="text" width="100%" />
                  ):(
                    <>
                    Products
                    </>
                  )}
                </h2>
              </div>
            </div>
        </div>
        </div>

        <Swiper {...options}>
          {loading
            ? [...Array(7)].map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="product-skeleton">
                    <Skeleton sx={{ borderRadius: 2 }} animation="wave" variant="rectangular" width="100%" height={210} />
                    <Skeleton animation="wave" variant="text" width="80%" sx={{ mt: 1 }} />
                    <Skeleton animation="wave" variant="text" width="50%" />
                    <Skeleton animation="wave" variant="text" width="60%" />
                  </div>
                </SwiperSlide>
              ))
            : products?.map((p, i) => (
                <SwiperSlide key={i} className="product">
                  <figure className="product-media">
                    <Link href={`/${p.sku}/${p.slug}`}>
                      <img src={p.image} alt={p.title} className="product-image" />
                    </Link>
                  </figure>
                  <div className="product-body">
                    <h3 className="product-title">
                      <Link href={`/${p.sku}/${p.slug}`}>
                        {truncateText(p.title, 19)}
                      </Link>
                    </h3>
                    <div className="product-price">
                      {p?.currency === "USD" ? "$" : "₵"}
                      {p.price?.toFixed(2)}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
        {/* <div className="mb-5"></div> */}
      </div>
  )
}

export default ProductCarousel
