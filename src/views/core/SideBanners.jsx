import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { SERVER_URL } from "../../api/constants";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const SideBanners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true); 

    const fetchData = async () => {
        try {
            const response = await api.get('/api/index/');
            setBanners(response.data.banners);
        } catch (error) {
        } finally {
          setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  return (

    <div  className="intro-banners">
    {loading ? (
      <Stack spacing={2}>
        {/* Skeleton for Banner */}
        <Skeleton sx={{ borderRadius: '10px' }} animation="wave" variant="rectangular" width="100%" height={100} />
        <Skeleton sx={{ borderRadius: '10px' }} animation="wave" variant="rectangular" width="100%" height={100} />
        <Skeleton sx={{ borderRadius: '10px' }} animation="wave" variant="rectangular" width="100%" height={100} />
      </Stack>
    ) : (
      banners.map((banner, i) => (
        <div  key={i} className="banner mb-lg-1 mb-xl-2">
          <a href={banner.link || '#'}>
            <img src={`${banner.image}`} alt="Banner" />
          </a>
          <div className="banner-content">
            <h4 className="banner-subtitle d-lg-none d-xl-block">
              <a href="#">Top Product</a>
            </h4>
            <h3 className="banner-title">
              <a href="#">Edifier <br />Stereo Bluetooth</a>
            </h3>
            <a className="banner-link">
              Shop Now<i className="icon-long-arrow-right"></i>
            </a>
          </div>
        </div>
      ))
    )}
  </div>

  )
}

export default SideBanners
