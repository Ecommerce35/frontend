import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// import Grid from '@mui/material/Grid';
import Grid from "@mui/material/Grid";

import { Tabs, Tab, CssBaseline, Stack } from '@mui/material';

import dayjs from 'dayjs';

import api from '../../../api/api';
import { useTheme } from '@emotion/react';
import { groupOptionsByFirstLetter, slugify } from '../Functions';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductImages from './ProductImages';
import ProductGeneralInfo from './ProductGeneralInfo';
import DeliveryOptions from './DeliveryOptions';
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

const EditProduct = () => {
    const { productId } = useParams(); // Get the product ID from the URL params
    const [isEditMode, setIsEditMode] = useState(false);

    const [deletedImages, setDeletedImages] = useState([]);

    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [regions, setRegions] = useState([])
    const [imagePreview, setImagePreview] = useState(null); // Store image preview URL
    const [deliveryOptions, setDeliveryOptions] = useState([]); // Store image preview URL
    const [fieldOptions, setOptions] = useState([]);

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

    const [images, setImages] = useState([]);
    const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState([]);



    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const options = groupOptionsByFirstLetter(categories);

    const brandOptions = groupOptionsByFirstLetter(brands);

    useEffect(() => {
        fetchProductData();
    }, []);
    


    const fetchProductData = async () => {
        try {
            const response = await api.get(`/vendor/product-related-data/`);
            const data = response.data;
            console.log(data.delivery_options);
            setCategories(data.sub_categories)
            setBrands(data.brands)
            setRegions(data.regions)
            setDeliveryOptions(data.delivery_options)
            
        } catch (err) {
            console.error("Error fetching product data:", err);
        }
    };

    useEffect(() => {
        if (isEditMode) {
            setData();
        }
    }, [isEditMode, brands, categories, brand, category]);

   const setData = async () => {
        if (!categories.length || !brands.length) {
            // Ensure data is fetched if not already
            await fetchProductData();
        }
        
        const categoryOp = options.find((option) => option.id === category);
        const brandOp = brandOptions.find((option) => option.id === brand);
        if (categoryOp) setSelectedCategory(categoryOp);
        if (brandOp) setSelectedBrand(brandOp);
    };



    useEffect(() => {
        if (productId) {
            setIsEditMode(true);
            fetchExistingProduct(productId); // Fetch product data to populate the form
        } else {
            setIsEditMode(false);
        }
        
    }, [productId]);

    const fetchExistingProduct = async (id) => {
        try {
            const response = await api.get(`/vendor/product/change/${id}/`);
            const productData = response.data.product;
            // Populate form fields with product data for editing
            setTitle(productData.title);
            setSlug(productData.slug);
            setCategory(productData.sub_category);
            setVariant(productData.variant);
            setBrand(productData.brand);
            setPrice(productData.price);
            setOldPrice(productData.old_price);
            setFeatures(productData.features);
            setDescription(productData.description);
            setSpecifications(productData.specifications);
            setDeliveryReturn(productData.delivery_returns);
            setTotalQuantity(productData.total_quantity);
            setWeight(productData.weight);
            setVolume(productData.volume);
            setMfd(dayjs(productData.mfd));
            setLifeSpan(productData.life);
            setPersonName(productData.available_in_regions);
            setProductType(productData.product_type);
            // setSelectedDeliveryOptions(productData.delivery_options);
            setImage(productData.image);
            setImagePreview(productData.image);

            const { images: savedImages, delivery_options } = response.data;
                    // Format delivery options to match the component's expected structure
            const formattedOptions = delivery_options.map(option => ({
                id: option.id,
                deliveryOptionId: option.delivery_option.id, // ID of the delivery option
                default: option.default,
            }));
            setOptions(formattedOptions);

            const formattedImages = savedImages.map(img => ({
                id: img.id,                    // Unique identifier
                file: null,                    // No file initially
                previewUrl: img.images 
            }));
            setImages(formattedImages);

            // setData(productData.sub_category, productData.brand);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };
    

    const handleDeliveryOptionsChange = (options) => {
        setSelectedDeliveryOptions(options);
        setOptions(options);
    };


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

  


    const handleSubmit = async (event) => {
        event.preventDefault();

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

            if (image instanceof File) {
                formData.append('image', image);
            }

            if (images && images.length > 0) {
                images
                    .filter((imgFile) => imgFile && imgFile.file)  // Filter out any empty entries
                    .forEach((imgFile) => {
                        formData.append('images[]', imgFile.file);
                    });
            }

            if (isEditMode && deletedImages && deletedImages.length > 0) {
                deletedImages.forEach((id) => formData.append('deletedImages', id));
            }

            const response = isEditMode
                ? await api.put(`/vendor/product/change/${productId}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                : await api.post('/vendor/product/add/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

            const data = response.data || { message: "No content" }; // Default message if no data
            console.log('Product saved successfully:', data);

        } catch (error) {
            if (error.response) {
                console.error('Error saving product:', error.response.data);
            } else {
                console.error('Error saving product:', error.message);
            }
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

    const handleDelete = async (productId) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
        });
  
        if (result.isConfirmed) {
          try {
            await api.delete(`/vendor/product/change/${productId}/`);
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            await fetchProducts();
          } catch (error) {
            Swal.fire(
              'Error!',
              error.response?.data || 'An error occurred while deleting the product.',
              'error'
            );
            console.error("Error deleting product:", error.response?.data || error.message);
          }
        }
    };

    

    
  return (
    <DashboardLayout>
        <Box
            component="main"
            sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            })}
            >
            <Stack
                spacing={2}
                sx={{
                    alignItems: 'center',
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                }}
                >

                <Box component="form" onSubmit={handleSubmit} sx={{ padding: 1, backgroundColor: '#fff' }}>
                    <Typography variant="h5" gutterBottom>
                        {isEditMode ? "Edit Product" : "Add New Product"}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, lg: 8, md: 8 }} columnGap={2} spacing={2}>
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

                                <Box sx={{ padding: 2 }}>
                                    {value === 0 && (
                                        <ProductGeneralInfo
                                            title={title} setTitle={setTitle}
                                            slug={slug}
                                            options={options} handleCategoryChange={handleCategoryChange}
                                            variant={variant} setVariant={setVariant}
                                            brandOptions={brandOptions} handleBrandChange={handleBrandChange}
                                            image={image}
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
                                            isEditMode={isEditMode}
                                        />
                                    )}

                                    {value === 1 && (
                                        <>
                                            <ProductImages 
                                            images={images} 
                                            onImagesChange={setImages} 
                                            setDeletedImages={setDeletedImages} 
                                            isEditMode={isEditMode}/>
                                        </>
                                    )}
                                    {value === 3 && (
                                        <>
                                            <DeliveryOptions 
                                            fieldOptions={fieldOptions} 
                                            onOptionsChange={handleDeliveryOptionsChange}
                                            deliveryOptions={deliveryOptions} />
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
                                    {isEditMode ? "Update Product" : "Add Product"}
                                </Button>
                                <Button type="submit" variant="contained" onClick={() => handleDelete(productId)} color="error" fullWidth>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Box>
    </DashboardLayout>
  );
};

export default EditProduct;
