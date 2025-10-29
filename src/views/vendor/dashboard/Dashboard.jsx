import React, { useEffect, useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import api from '../../../api/api';
import { MainGrid, ProductPerformanceChart } from '../parts/MainGrid';


export default function Dashboard(props) {
  const [about, setAbout] = useState(null)
  const [performanceData, setPerformanceData] = useState([]);
  const [productData, setProductData] = useState([]);


  useEffect(() => {
    vendorAbout(); // Fetch product data to populate the form
  }, []);


  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await api.get('/vendor/data/'); // Replace with your API endpoint
        setPerformanceData(response.data.orders_by_month); // Orders by month
        setProductData(response.data.product_sales);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();
  }, []);

  const vendorAbout = async () => {
      try {
          const response = await api.get(`/vendor/about/`);
          const aboutData = response.data;
          setAbout(aboutData)
      } catch (error) {
          console.error('Error fetching product:', error);
      }
  };
const BASE_URL = "http://192.168.202.89:8000"; // Replace with your actual backend URL

  return (
    <DashboardLayout>
        <MainGrid data={performanceData} />
        <ProductPerformanceChart data={productData} />
    </DashboardLayout>
  
  );
}