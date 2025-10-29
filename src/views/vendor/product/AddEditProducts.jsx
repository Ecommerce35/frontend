import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Grid from '@mui/material/Grid2';
import { Tabs, Tab, CssBaseline, Stack } from '@mui/material';
import dayjs from 'dayjs';

import api from '../../../api/api';
import { useTheme } from '@emotion/react';
import { groupOptionsByFirstLetter, slugify } from '../Functions';
import ProductImages from './ProductImages';
import ProductGeneralInfo from './ProductGeneralInfo';
import DeliveryOptions from './DeliveryOptions';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DashboardLayout from '../DashboardLayout';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight: theme?.typography?.fontWeightRegular || 400,  // Fallback to 400 if undefined
      ...(personName.includes(name) && {
        fontWeight: theme?.typography?.fontWeightMedium || 500,  // Fallback to 500 if undefined
      })
    };
  }

const ProductForm = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [regions, setRegions] = useState([])
    const [imagePreview, setImagePreview] = useState(null); // Store image preview URL
    const [deliveryOptions, setDeliveryOptions] = useState(null); // Store image preview URL
  
    const [personName, setPersonName] = useState([]);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [variant, setVariant] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('1.99');
    const [oldPrice, setOldPrice] = useState('2.99');
    const [features, setFeatures] = useState('');
    const [description, setDescription] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [deliveryReturns, setDeliveryReturn] = useState('');
    const [totalQuantity, setTotalQuantity] = useState('10');
    const [weight, setWeight] = useState('1.0');
    const [volume, setVolume] = useState('1.0');
    const [mfd, setMfd] = useState(dayjs());
    const [lifeSpan, setLifeSpan] = useState('3');
    const [productType, setProductType] = useState(null);
    const [formErrors, setFormErrors] = useState({});


    const [images, setImages] = useState([]);
    const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState([]);
    const [fieldOptions, setOptions] = useState([
        { id: 1, default: false },
    ]);

    const handleDeliveryOptionsChange = (options) => {
        setSelectedDeliveryOptions(options);
        setOptions(options);
    };

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const options = groupOptionsByFirstLetter(categories);
    const brandOptions = groupOptionsByFirstLetter(brands);


    useEffect(() => {
        // Simulate loading categoryId from backend or local storage
        const categoryOp = options.find((option) => option.id === category);
        const brandOp = brandOptions.find((option) => option.id === brand);
        if (categoryOp) {
            setSelectedCategory(categoryOp);
        }
        if (brandOp) {
            setSelectedBrand(brandOp);
        }
    }, []);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Save file for submission

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Show preview
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (title) {
            setSlug(slugify(title)); // Use the slugify function to generate the slug
        }
    }, [title]);

    const handleDateChange = (newDate) => {
        setMfd(newDate); // newDate is a dayjs object
    };

    const handleCategoryChange = (event, selectedCategory) => {
        setSelectedCategory(selectedCategory);  // Store the full category object
        if (selectedCategory) {
            setCategory(selectedCategory.id); // Set the category ID (assuming it's `id`)
        }
    };

  const handleBrandChange = (event, selectedBrand) => {
    setSelectedBrand(selectedBrand)
    if (selectedBrand) {
        setBrand(selectedBrand.id); // Update the state with the selected category
    }
  };

  const handleFeatureChange = (value) => {
    setFeatures(value);  // value will contain the HTML content of the editor
  };
  const handleDeliveryChange = (value) => {
    setDeliveryReturn(value);  // value will contain the HTML content of the editor
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);  // value will contain the HTML content of the editor
  };
  const handleSpecificationChange = (value) => {
    setSpecifications(value);  // value will contain the HTML content of the editor
  };


  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchProductData()
  }, []);

    const fetchProductData = async () => {
        // setLoading(true)
        try {
            const response = await api.get(`/vendor/product-related-data/`);
            const data = response.data;
            console.log(data);
            setCategories(data.sub_categories)
            setBrands(data.brands)
            setRegions(data.regions)
            setDeliveryOptions(data.delivery_options)
            
        } catch (err) {
            console.error("Error fetching product data:", err);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!title.trim()) errors.title = 'Title is required';
        if (!slug.trim()) errors.slug = 'Slug is required';
        if (!selectedCategory) errors.category = 'Category is required';
        if (!selectedBrand) errors.brand = 'Brand is required';
        if (!variant.trim()) errors.variant = 'Variant is required';
        if (!price) errors.price = 'Price is required';
        if (!totalQuantity) errors.totalQuantity = 'Total quantity is required';
        if (!weight) errors.weight = 'Weight is required';
        if (!volume) errors.volume = 'Volume is required';
        if (!lifeSpan) errors.lifeSpan = 'Life span is required';
        if (!mfd) errors.mfd = 'Manufacture date is required';
        if (!description.trim()) errors.description = 'Description is required';
        if (personName.length === 0) errors.shipsTo = 'Please select at least one region';
    
        return errors;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            Swal.fire({
                title: 'Error',
                text: 'Please fill out all required fields.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            setFormErrors((prevErrors) => ({ ...prevErrors, [name]: formErrors })); // Update state to display error messages
            return;
        }

        const productData = {
            available_in_regions: personName || [],   // Array of region IDs
            title,
            slug,
            sub_category: category,             // ID of the selected subcategory
            variant,
            brand,                              // ID of the selected brand
            price: parseFloat(price),
            old_price: parseFloat(oldPrice),
            features,
            description,
            specifications,
            delivery_returns: deliveryReturns,
            total_quantity: parseInt(totalQuantity),
            weight: parseFloat(weight),
            volume: parseFloat(volume),
            mfd: mfd.format('YYYY-MM-DD'),      // Format manufacturing date
            life: parseInt(lifeSpan),
            product_type: productType || 'new',
            delivery_options: selectedDeliveryOptions,
        };

        try {
            const formData = new FormData();

            // Append each field to the FormData instance
            Object.keys(productData).forEach((key) => {
                if (Array.isArray(productData[key])) {
                    productData[key].forEach((item) => {
                        if (typeof item === 'object') {
                            // Serialize objects to JSON
                            formData.append(key, JSON.stringify(item));
                        } else {
                            formData.append(key, item);
                        }
                    });
                } else {
                    formData.append(key, productData[key]);
                }
            });

            // Append the image file separately (ensure `image` is a file object)
            if (image) {
                formData.append('image', image);
            }

            if (images && images.length > 0) {
                images
                    .filter((imgFile) => imgFile && imgFile.file)  // Filter out any empty entries
                    .forEach((imgFile) => {
                        formData.append('images[]', imgFile.file);
                    });
            }

            // Make the POST request to the server
            const response = await api.post('/vendor/product/add/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: 'Product saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                navigate(`/vendor/product/change/${response.data.id}`);
            }


        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data || error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

      
    const handleRegionChange = (event) => {
        const { value } = event.target;
        
        // If the value is a string, split it to get multiple selected regions
        const selectedRegionNames = typeof value === 'string' ? value.split(',') : value;
        
        // Map selected region names to their corresponding IDs
        const selectedRegionIDs = selectedRegionNames.map(regionName => {
            const region = regions.find(r => r.name === regionName);
            return region ? region.id : null;  // Return the ID, or null if region not found
        }).filter(id => id !== null);  // Filter out any null values in case a region is not found
    
        // Toggle the selected region IDs in the state
        setPersonName(prev => {
            // Toggle the selection (add if not present, remove if present)
            const newSelectedRegions = [...prev]; // Copy the previous selected regions
            selectedRegionIDs.forEach(id => {
                const index = newSelectedRegions.indexOf(id);
                if (index === -1) {
                    newSelectedRegions.push(id);  // Add the region ID if it's not already selected
                } else {
                    newSelectedRegions.splice(index, 1);  // Remove the region ID if it's already selected
                }
            });
            return newSelectedRegions;
        });
    };


  return (
    <DashboardLayout>
       
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 1, backgroundColor: '#fff', width: '100%' }}>
            <Typography variant="h5" gutterBottom>
                Add New Product
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, lg: 8, md: 8 }} spacing={2}>
                    <Card>
                        <CardContent >
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            value={value} onChange={handleTabChange}>
                                <Tab label="General" />
                                <Tab label="Product Images" />
                                <Tab label="Variants" />
                                <Tab label="Product delivery options" />
                            </Tabs>
                        </Box>

                        <Box sx={{ padding: 1 }}>
                            {value === 0 && (
                                <ProductGeneralInfo
                                    title={title} setTitle={setTitle}
                                    slug={slug}
                                    options={options} handleCategoryChange={handleCategoryChange}
                                    variant={variant} setVariant={setVariant}
                                    brandOptions={brandOptions} handleBrandChange={handleBrandChange}
                                    price={price} setPrice={setPrice}
                                    oldPrice={oldPrice} setOldPrice={setOldPrice}
                                    totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity}
                                    weight={weight} setWeight={setWeight}
                                    volume={volume} setVolume={setVolume}
                                    lifeSpan={lifeSpan} setLifeSpan={setLifeSpan}
                                    mfd={mfd} handleDateChange={handleDateChange}
                                    productType={productType} setProductType={setProductType}
                                    deliveryReturns={deliveryReturns} handleDeliveryChange={handleDeliveryChange}
                                    features={features} handleFeatureChange={handleFeatureChange}
                                    description={description} handleDescriptionChange={handleDescriptionChange}
                                    specifications={specifications} handleSpecificationChange={handleSpecificationChange}
                                    personName={personName} handleRegionChange={handleRegionChange}
                                    regions={regions} MenuProps={MenuProps} getStyles={getStyles} theme={theme}
                                    selectedCategory={selectedCategory}
                                    selectedBrand={selectedBrand}
                                    handleImageChange={handleImageChange}
                                    imagePreview={imagePreview}
                                />
                            )}

                            {value === 1 && (
                                <>
                                    <ProductImages images={images} onImagesChange={setImages} />
                                </>
                            )}
                            {value === 3 && (
                                <>
                                    <DeliveryOptions fieldOptions={fieldOptions} onOptionsChange={handleDeliveryOptionsChange} deliveryOptions={deliveryOptions} />
                                </>
                            )}
                        </Box>
                        {/* Slug */}
                            
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, lg: 4, md: 4 }}>
                    {/* Submit Button */}
                    <Grid spacing={2} columnSpacing={2} size={{ xs: 12 }}>
                        <Button onClick={handleSubmit} type="submit" variant="contained" color="success" fullWidth>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>

    </DashboardLayout>

  );
};

export default ProductForm;
