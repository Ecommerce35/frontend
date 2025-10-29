// Import the necessary components from React, React Leaflet, and Leaflet
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '500px',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const defaultPosition = [6.700071, -1.630783]; // Default map position (latitude, longitude)

// Create a component for the Map modal
const MapModal = ({ open, handleClose }) => {
  const [position, setPosition] = useState(defaultPosition);
  const [locationName, setLocationName] = useState('');

  // Reverse geocode function to get location name
  const reverseGeocode = (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.display_name) {
            console.log(data);
            
          setLocationName(data.display_name);
        } else {
          setLocationName("Location name not found");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setLocationName("Error retrieving location name");
      });
  };

  // This component will handle marker drag events
  const DraggableMarker = () => {
    const map = useMapEvents({
      dragend: (e) => {
        const markerLatLng = e.target.getCenter();
        setPosition([markerLatLng.lat, markerLatLng.lng]);
        reverseGeocode(markerLatLng.lat, markerLatLng.lng);
      }
    });

    return (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = e.target.getLatLng();
            setPosition([lat, lng]);
            reverseGeocode(lat, lng); // Update the location name
          }
        }}
      />
    );
  };

  // Optional: Use geolocation to set the user's current location (similar to the navigator.geolocation API in vanilla JS)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPosition([userLocation.lat, userLocation.lng]);
        reverseGeocode(userLocation.lat, userLocation.lng);
      });
    }
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select Your Delivery Location
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Drag the marker to select your preferred location. The location name will be updated based on your selection.
        </Typography>

        {/* MapContainer for rendering the map */}
        <Box sx={{ height: '300px', mt: 2 }}>
          <MapContainer center={position} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Draggable marker component */}
            <DraggableMarker />
          </MapContainer>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Location Name:</strong> {locationName}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Latitude:</strong> {position[0].toFixed(6)} <br />
          <strong>Longitude:</strong> {position[1].toFixed(6)}
        </Typography>

        <Button onClick={handleClose} variant="contained" sx={{ mt: 3 }}>
          Confirm Location
        </Button>
      </Box>
    </Modal>
  );
};

export default MapModal;
