import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Grid2 from '@mui/material/Grid2';
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { Link, useNavigate } from 'react-router-dom';
import AddressModal from '../checkout/AddressModal'; // Assuming you already have this component
import axios from 'axios';
import Swal from 'sweetalert2';



const AddressPage = () => {
    const [addressesList, setAddressesList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(''); // State for input value
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [select, setSelected] = useState(false);
    const API_KEY = 'pk.ac7f55c6c458a12ea5ed586db0b1bb4d'; // Replace with your LocationIQ API key


    const navigate = useNavigate();

    useEffect(() => {
        fetchAddresses();
    }, []);

    // Fetch the user's addresses when the component mounts
    const fetchAddresses = async () => {
      try {
        const response = await api.get('/api/v1/address/addresses/', {
        });
        setAddressesList(response.data);
      } catch (error) {
        setError('Unable to fetch addresses.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    const handleDefaultChange = async (id) => {
        try {
            // Show confirmation dialog
            const result = await Swal.fire({
                title: 'Set as Default?',
                text: "Are you sure you want to make this address the default?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, make it default',
                cancelButtonText: 'Cancel'
            });
    
            if (result.isConfirmed) {
                // Send a POST request to make the address default
                const response = await api.put('/api/v1/address/addresses/default/', { id });
    
                if (response.status === 200) {
                    // Update the addresses list in the frontend
                    const updatedAddresses = addressesList.map((address) =>
                        address.id === id
                            ? { ...address, status: true }
                            : { ...address, status: false }
                    );
                    setAddressesList(updatedAddresses);
    
                    Swal.fire({
                        title: 'Success!',
                        text: 'Address has been made default successfully.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            }
        } catch (error) {
            console.error('Error making address default', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to make address default. Please try again.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };
    


    const handleDelete = async (id) => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const response = await api.delete(`/api/v1/address/addresses/${id}/`);
                if (response.status === 204) {
                    await fetchAddresses();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Address deleted successfully.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            } catch (error) {
                console.error('Error deleting address:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete address. Please try again.',
                    icon: 'error',
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        }
    };
        

    // Open modal for editing or adding an address
  const handleOpen = (addressId = null) => {
    setSelectedAddressId(addressId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAddressId(null);
    setInputValue(''); // Reset input value
    setSuggestions([]); // Reset suggestions
    setSelectedLocation(null); // Reset selected location
    fetchAddresses();
  };

  // Handle input changes and fetch autocomplete suggestions
  const handleChangeInput = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 2) {
      await fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: API_KEY,
          q: query,
          format: 'json',
        },
      });
      console.log(response.data)
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.display_name); // Set input to selected suggestion
    setSelectedLocation(suggestion); // Store selected location
    setSuggestions([]); // Clear suggestions after selection
    setSelected(true)
  };
    
  return (
    <>
    <Header/>
    <div className='container'>
        <Box sx={{ padding: '0.5rem' }}>
        <Typography fontWeight='bold' m={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} variant="h5" gutterBottom>
            Manage addresses
        </Typography>

            {loading? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                 <CircularProgress />
                </Box>
            ) : (
            <Grid2 sx={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', display: 'grid',gap: '1rem',padding: '1rem',}} container spacing={2}>
                {/* Add New Address Card */}
                <Grid2 item xs={12} sm={6} md={4}>
                    <Card sx={{ border: 'dotted' }}>
                        <CardContent>
                        {addressesList.length >= 4 ? (
                            <Typography variant="h5" align="center">
                            Add new address
                            </Typography>
                        ) : (
                            <>
                            <Typography align="center" variant="h5">Add new address</Typography>
                                <Link onClick={() => handleOpen()}>
                                    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                                        <IconButton color="primary">
                                            <AddIcon fontSize="large" />
                                        </IconButton>
                                    </Box>
                                </Link>
                            </>
                        )}
                        {addressesList.length >= 4 && (
                            <Typography color="textSecondary" align="center">
                            Can have a maximum of four addresses. You can only edit or delete.
                            </Typography>
                        )}
                        </CardContent>
                    </Card>
                </Grid2>

                <AddressModal
                    open={open}
                    handleClose={handleClose}
                    selectedAddressId={selectedAddressId}
                    handleAddressChange={fetchAddresses}
                    handleChangeInput={handleChangeInput}
                    inputValue={inputValue}
                    setInputValue={setInputValue} // Pass setInputValue for AddressModal
                    suggestions={suggestions}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    handleSuggestionClick={handleSuggestionClick}
                    select={select}
                />

                {/* Loop through the address list */}
                {addressesList.map((address) => (
                <Grid2 item xs={12} sm={6} md={4} key={address.id}>
                    <Card>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                               <Typography variant="h5" color="success.main">
                                    <Switch checked={address.status === true}  onChange={() => handleDefaultChange(address.id)} size="small" />
                                </Typography>
                            </Box>

                            <Typography variant="body1">
                                <strong>{`${address.full_name}`}</strong> <br />
                                {address.mobile} <br />
                                {address.email} <br />
                                {address.town} <br />
                                {address.region} <br />
                                {address.country}
                            </Typography>

                            <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button
                                onClick={() => handleOpen(address.id)}
                                startIcon={<EditIcon />}
                                variant="contained"
                                size="small"
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<DeleteIcon />}
                                color="error"
                                variant="contained"
                                size="small"
                                onClick={() => handleDelete(address.id)}
                            >
                                Delete
                            </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                ))}
            </Grid2>
            )}
        </Box>

    </div>
    <Footer/>
    </>
  );
};

export default AddressPage;
