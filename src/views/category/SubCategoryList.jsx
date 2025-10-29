import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import { Link, useParams } from 'react-router-dom';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import RecentlyViewedProducts from '../partials/RecentlyViewedProducts';


const options = {
    nav: true,
    dots: false,
    margin: 7,
    loop: false,
    responsive: {
      0: { items: 2 },
      480: { items: 2 },
      768: { items: 4 },
      992: { items: 6 },
      1200: { items: 6 },
    },
  };

const SubCategoryList = () => {
    const [loading, setLoading] = useState(true);
    const [cat, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const { slug, category } = useParams()
    const [isLoading, setIsLoading] = useState(true);


   const [viewedProducts, setViewedProducts] = useState([]);

    // Fetch products on mount and whenever the location changes
    useEffect(() => {
        fetchCategory();
    }, [slug, category]);
    

    // Fetch products based on slug and URL parameters
    const fetchCategory = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/api/subcategory/${slug}/${category}/`);
            const data = response.data;
            console.log(data);
            setCategory(data.category);
            setSubCategory(data.sub_category);
            
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function fetchViewedProducts() {
            setIsLoading(true);
            try {
                const response = await api.get('/api/viewed-products/');
                
                setViewedProducts(response.data.recently_viewed || []);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching viewed products:", error);
            }
            setIsLoading(false);
        }
    
        fetchViewedProducts();
    }, []);

    
  const BASE_URL = "http://192.168.202.89:8000"; // Replace with your actual backend URL


  return (
    <>
    <Header/>
            <main className="container">
                {/* Page Header */}
                <div
                    className="page-header text-center"
                    style={{ backgroundImage: `url(${BASE_URL}/static/assetss/images/page-header-bg.jpg)` }}
                >
                    <div className="container">
                        <h1 className="page-title">
                            {cat?.title} <span>Shop</span>
                        </h1>
                    </div>
                </div>

                <div className="page-content">
                    <div className="container">
                    {cat && (
                        <div className="container">
                        <div className="cat-blocks-container">
                            <div className="row">
                            {subCategory.map((c) => (
                                <div key={c.id} className="col-6 col-sm-4 col-lg-2">
                                <Link to={`/category/${c.slug}`} className="cat-block">
                                    <figure>
                                    <span>
                                        <img
                                        style={{ opacity: 1 }}
                                        src={`${BASE_URL}${c.image}`}
                                        alt="Category"
                                        />
                                    </span>
                                    </figure>
                                    <h3 className="cat-block-title">{c.title}</h3>
                                </Link>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    )}
                    </div>
                </div>

                <RecentlyViewedProducts/>

            </main>
    <Footer/>
    </>
  )
}

export default SubCategoryList
