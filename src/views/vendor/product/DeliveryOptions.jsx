import React, { useState } from 'react';
import { Typography, Select, MenuItem, IconButton, Checkbox, Button, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid2'

const DeliveryOptions = ({ fieldOptions, onOptionsChange, deliveryOptions }) => {

    const handleAddOption = () => {
        const newOptions = [...fieldOptions, { id: fieldOptions.length + 1, deliveryOptionId: '', default: false }];
        onOptionsChange(newOptions);
    };

    const handleRemoveOption = (index) => {
        const newOptions = fieldOptions.filter((_, i) => i !== index);
        onOptionsChange(newOptions);
    };

    const handleSelectChange = (index, value) => {
        const updatedOptions = fieldOptions.map((option, i) =>
            i === index ? { ...option, deliveryOptionId: value } : option
        );
        onOptionsChange(updatedOptions);
    };

    const handleDefaultChange = (index) => {
        const updatedOptions = fieldOptions.map((option, i) => ({
            ...option,
            default: i === index ? !option.default : false,
        }));
        onOptionsChange(updatedOptions);
    };

    return (
        <div>
            <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid #ddd', paddingBottom: 1 }}>
                <Grid size={{ xs: 8 }}>
                    <Typography variant="subtitle1">Delivery option</Typography>
                </Grid>
                <Grid size={{ xs: 2 }}>
                    <Typography variant="subtitle1">Default</Typography>
                </Grid>
                <Grid size={{ xs: 2 }}>
                    <Typography variant="subtitle1">Delete?</Typography>
                </Grid>
            </Grid>

            {fieldOptions.map((option, index) => (
                <Grid container spacing={2} alignItems="center" sx={{ marginTop: 1 }} key={option.id}>
                    <Grid size={{ xs: 8 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Select Option</InputLabel>
                            <Select
                                value={option.deliveryOptionId}
                                onChange={(e) => handleSelectChange(index, e.target.value)} 
                                label="Select Option"
                                >
                                {deliveryOptions.map((d) => (
                                    <MenuItem key={d.id} value={d.id}>{d.name} ({d.min_days}-{d.max_days} Days)</MenuItem>
                                ))}
                                
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 2 }}>
                        <Checkbox checked={option.default} onChange={() => handleDefaultChange(index)} />
                    </Grid>

                    <Grid size={{ xs: 2 }}>
                        <Button variant="contained" color="error" size="small" onClick={() => handleRemoveOption(index)}>
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            ))}

            <Button variant="outlined" color="primary" sx={{ marginTop: 2 }} onClick={handleAddOption}>
                Add another Product delivery option
            </Button>
        </div>
    );
};

export default DeliveryOptions;
