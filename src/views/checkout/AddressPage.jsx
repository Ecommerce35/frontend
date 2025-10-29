import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import axios from 'axios';
import AddressModal from './AddressModal'; // Assuming you already have this component
import api from '../../api/api';
import { useCart } from '../../utils/CartContext';

const AddressPage = () => {
  const { calculateOrderSummary } = useCart();
  const [addressesList, setAddressesList] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(''); // State for input value
  const [suggestions, setSuggestions] = useState([]); // State for suggestions
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [select, setSelected] = useState(false);

  const API_KEY = 'pk.ac7f55c6c458a12ea5ed586db0b1bb4d'; // Replace with your LocationIQ API key

  // Fetch addresses list
  const fetchAddresses = async () => {
    try {
      const response = await api.get('/api/v1/address/addresses/');
      setAddressesList(response.data);
    } catch (error) {
      setError('Unable to fetch addresses.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

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

  const handleAddressClick = async (id) => {
    try {
      // Update the selected address as the default one
      await api.put('/api/v1/address/addresses/default/', { id });
      const updatedAddresses = addressesList.map((address) =>
        address.id === id ? { ...address, status: true } : { ...address, status: false }
      );
      setAddressesList(updatedAddresses);
      await fetchAddresses(); // Refresh addresses list
    } catch (error) {
      console.error('Error updating address:', error);
    }
    await calculateOrderSummary(); // Update the cart summary based on address
  };

  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', width: '100%', maxWidth: '600px' }}>
      {/* Title */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Choose a shipping address
      </Typography>

      {/* Modal for adding/editing an address */}
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

      {/* Radio group for selecting an address */}
      <RadioGroup>
        {addressesList.map((address) => (
          <Box
            key={address.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              mb: 2,
            }}
          >
            <FormControlLabel
              value={address.id.toString()}
              control={<Radio onChange={() => handleAddressClick(address.id)} checked={address.status} />}
              label={
                <Typography>
                  <strong>{address.full_name}</strong> {address.address}
                </Typography>
              }
            />
            <Button variant="outlined" color="secondary" onClick={() => handleOpen(address.id)}>
              Edit Address
            </Button>
          </Box>
        ))}

        {/* Option to add a new address */}
        {addressesList.length >= 4 ? (
          <Typography sx={{ color: 'red', mt: 2 }}>
            You have reached the maximum number of allowed addresses.
          </Typography>
        ) : (
          <Box sx={{ ml: 4, mb: 2 }}>
            <Button variant="outlined" color="secondary" onClick={() => handleOpen()}>
              Add new address
            </Button>
          </Box>
        )}
      </RadioGroup>
    </Box>
  );
};

export default AddressPage;
