import React, { useState } from 'react';
import { Box, Button, TextField, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { SERVER_URL } from '../../../api/constants';



const ProductImages = ({ images, onImagesChange, setDeletedImages, isEditMode }) => {
    // Add a new image field
    const addImageField = () => {
        onImagesChange([...images, { id: null, file: null, previewUrl: null }]);
    };

    // Handle image file selection and preview generation
    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        const previewUrl = URL.createObjectURL(file);

        const updatedImages = images.map((img, i) =>
            i === index ? { ...img, file, previewUrl } : img
        );

        onImagesChange(updatedImages);
    };

    const removeImageField = (index) => {
        const imageToRemove = images[index];
        if (imageToRemove.id) {
            setDeletedImages((prevDeletedImages) => [...(prevDeletedImages || []), imageToRemove.id]);
        }
        const updatedImages = images.filter((_, i) => i !== index);
        onImagesChange(updatedImages);
    }
    
    return (
        <Box>
            <Button variant="outlined" onClick={addImageField} sx={{ mb: 2 }}>
                Add Image
            </Button>
            {images.map((img, index) => (
                <Grid container sx={{ m: 2 }} spacing={2} alignItems="center" key={img.id || index}>
                    <Grid size={{ xs: 8 }}>
                        <TextField
                            type="file"
                            accept="image/*"
                            fullWidth
                            onChange={(e) => handleImageChange(index, e)}
                        />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                        {img.previewUrl && (
                            <img
                                src={isEditMode && !img.file ? `${SERVER_URL}${img.previewUrl}` : img.previewUrl}
                                alt="Preview"
                                style={{ width: '100%', height: 'auto', maxHeight: '100px', borderRadius: '8px' }}
                            />
                        )}
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                        <IconButton onClick={() => removeImageField(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};

export default ProductImages;


