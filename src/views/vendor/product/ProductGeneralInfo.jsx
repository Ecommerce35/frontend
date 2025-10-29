import React, { useState } from 'react';
import { Box, Typography, TextField, FormControl, Autocomplete, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import Editor from './Editor';



const ProductGeneralInfo = ({
    title, setTitle,
    slug,
    options, handleCategoryChange,
    variant, setVariant,
    brandOptions, handleBrandChange,
    image,
    price, setPrice,
    oldPrice, setOldPrice,
    totalQuantity, setTotalQuantity,
    weight, setWeight,
    volume, setVolume,
    lifeSpan, setLifeSpan,
    mfd, handleDateChange,
    productType, setProductType,
    deliveryReturns, handleDeliveryChange,
    features, handleFeatureChange,
    description, handleDescriptionChange,
    specifications, handleSpecificationChange,
    personName, handleRegionChange,
    regions, MenuProps, getStyles, theme,
    selectedCategory,
    selectedBrand,
    handleImageChange,
    imagePreview,
    isEditMode
}) => {

    const handleEditorChange = (field) => {
     
    }


    return (

        <Box component='form' columnGap={2} spacing={1}>
            {/* Title */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Title</Typography>
                <TextField
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    size="small"
                />
            </Grid>

            {/* Slug */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Slug</Typography>
                <TextField
                    name="slug"
                    value={slug}
                    fullWidth
                    size="small"
                    required
                    readOnly
                />
            </Grid>

            {/* Image */}
            <Grid container className='mb-1' spacing={2} size={{ xs: 12 }}>
                <Grid className='d-flex' size={{ xs: 10 }}>
                    <Typography variant='h6' sx={{ fontWight: 'bold', mr: 3 }} >Image</Typography>
                    <TextField
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        fullWidth
                        size="small"
                    />
                </Grid>
                <Grid size={{ xs: 2 }}>
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: '100%', height: 'auto', maxHeight: '100px', borderRadius: '8px' }}
                        />
                    )}
                </Grid>
            </Grid>

            {/* Category Selection */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Category</Typography>
                <FormControl size="small" fullWidth>
                    <Autocomplete
                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.title}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        renderInput={(params) => <TextField {...params} label="Select Category" />}
                        sx={{ width: '100%' }}
                        size='small'
                    />
                </FormControl>
            </Grid>

            {/* Variant */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWight: 'bold', mr: 3 }} >Variant</Typography>
                <FormControl size="small" fullWidth>
                    <Select
                        label="Select Variant"
                        value={variant}
                        onChange={(e) => setVariant(e.target.value)}
                        required
                    >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Size">Size</MenuItem>
                    <MenuItem value="Color">Color</MenuItem>
                    <MenuItem value="Size-Color">Size-Color</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {/* Brand Selection */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Brand</Typography>
                <FormControl size="small" fullWidth>
                    <Autocomplete
                        options={brandOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.title}
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        renderInput={(params) => <TextField {...params} label="Select Brand" />}
                        sx={{ width: '100%' }}
                        size='small'
                        required
                    />
                </FormControl>
            </Grid>

            {/* Price */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Price</Typography>
                <TextField
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    size="small"
                />
            </Grid>

            {/* Old Price */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Old Price</Typography>
                <TextField
                    name="oldPrice"
                    type="number"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    fullWidth
                    size="small"
                />
            </Grid>

            

            {/* Quantity */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Total Quantity</Typography>
                <TextField
                    name="totalQuantity"
                    type="number"
                    value={totalQuantity}
                    onChange={(e) => setTotalQuantity(e.target.value)}
                    fullWidth
                    size="small"
                />
            </Grid>

            {/* Weight */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Weight (kg)</Typography>
                <TextField
                    name="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    fullWidth
                    size="small"
                />
            </Grid>

            {/* Volume */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Volume (cm³)</Typography>
                <TextField
                    name="volume"
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    fullWidth
                    size="small"
                />
            </Grid>

            {/* Life Span */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Life Span (months)</Typography>
                <TextField
                    name="lifeSpan"
                    type="number"
                    value={lifeSpan}
                    onChange={(e) => setLifeSpan(e.target.value)}
                    fullWidth
                    size="small"
                />
            </Grid>

            {/* Manufacture Date */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Manufacture Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={mfd}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                    />
                </LocalizationProvider>
            </Grid>

             {/* Product Type */}
            <Grid className='d-flex mb-1' size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }} >Type</Typography>
                <FormControl size="small" fullWidth>
                    <Select
                        value={productType || 'new'}  // Default to 'new' if productType is undefined or null
                        onChange={(e) => setProductType(e.target.value)}
                    >
                        <MenuItem value="book">Book</MenuItem>
                        <MenuItem value="grocery">Grocery</MenuItem>
                        <MenuItem value="refurbished">Refurbished</MenuItem>
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="used">Used</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {/* Delivery and Returns */}
            <Grid className='d-flex mb-5 py-4 my-4' sx={{ mb: 10 }} size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Delivery and Returns</Typography>
                <ReactQuill
                    theme="snow"
                    value={deliveryReturns}
                    onChange={handleDeliveryChange}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, true] }],
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                        ],
                    }}
                />
            </Grid>
            <Grid className='d-flex mb-5 py-4 my-4' sx={{ mb: 10 }} size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Specifications</Typography>
                <ReactQuill
                    theme="snow"
                    value={specifications}
                    onChange={handleSpecificationChange}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, true] }],
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                        ],
                    }}
                />
            </Grid>

            <Box>
                <Editor
                label="Features"
                value={formData.features}
                onChange={handleEditorChange('features')}
                placeholder="Enter product features..."
                />
            </Box>

            <Box mt={2}>
                <Editor
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                // onChange={handleEditorChange('description')}
                placeholder="Enter product description..."
                />
                {/* {formErrors.description && (
                <FormHelperText error>{formErrors.description}</FormHelperText>
                )} */}
            </Box>

            {/* Ships to Regions */}
            <Grid className='d-flex mb-5 py-4 my-4' sx={{ marginY: 10, width: '100%' }} size={{ xs: 12 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mr: 3 }}>Ships to</Typography>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="region-select-chip-label">Ships to</InputLabel>
                    <Select
                        labelId="region-select-chip-label"
                        id="region-select-chip"
                        multiple
                        value={personName}
                        onChange={handleRegionChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Regions" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => {
                                    const region = regions.find(region => region.id === value); // Get region by ID
                                    return region ? <Chip key={value} label={region.name} /> : null;
                                })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {regions.map((region) => (
                            <MenuItem
                                key={region.id}
                                value={region.name}  // Value is the region name for selection
                                style={getStyles(region.name, personName, theme)}
                            >
                                {region.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Box>
    );
};

export default ProductGeneralInfo;
