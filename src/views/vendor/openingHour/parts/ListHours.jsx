import React, { useEffect, useState } from 'react';
import { Box, Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import api from '../../../../api/api';
import OpeningHourFormModal from './AddHours';
import Swal from 'sweetalert2';
import Skeleton from '@mui/material/Skeleton';

const OpeningHoursList = () => {
  const [openingHours, setOpeningHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedHour, setSelectedHour] = useState(null);

  // Fetch opening hours from the API
  const fetchOpeningHours = async () => {
    try {
      const response = await api.get('/vendor/opening-hours/');
      setOpeningHours(response.data);
    } catch (error) {
      console.error('Error fetching opening hours:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpeningHours();
  }, []);

  // Function to handle deletion
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await api.delete(`/vendor/opening-hours/${id}/`);
        setOpeningHours(openingHours.filter((hour) => hour.id !== id));
        Swal.fire('Deleted!', 'The opening hour has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting opening hour:', error);
      Swal.fire('Error!', 'There was a problem deleting the opening hour.', 'error');
    }
  };

  // Function to handle edit
  const handleEdit = (hour) => {
    setSelectedHour(hour);
    setModalMode('edit');
    setModalOpen(true);
  };

  // Function to handle adding a new opening hour
  const handleAdd = () => {
    setSelectedHour({ day: '', from_hour: '', to_hour: '', is_closed: false });
    setModalMode('add');
    setModalOpen(true);
  };

  // Callback to refresh data after add/edit
  const handleFormSubmitSuccess = () => {
    fetchOpeningHours();
    setModalOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <Skeleton variant="text" width="200px" height={40} style={{ marginBottom: '10px' }} />
        <TableContainer component={Paper}>
          <Table aria-label="opening hours table">
            <TableHead>
              <TableRow>
                <TableCell><Skeleton variant="text" width="60px" /></TableCell>
                <TableCell><Skeleton variant="text" width="100px" /></TableCell>
                <TableCell><Skeleton variant="text" width="100px" /></TableCell>
                <TableCell><Skeleton variant="text" width="80px" /></TableCell>
                <TableCell><Skeleton variant="text" width="100px" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton variant="text" width="60px" /></TableCell>
                    <TableCell><Skeleton variant="text" width="100px" /></TableCell>
                    <TableCell><Skeleton variant="text" width="100px" /></TableCell>
                    <TableCell><Skeleton variant="text" width="80px" /></TableCell>
                    <TableCell>
                      <Skeleton variant="rectangular" width={80} height={30} />
                      <Skeleton variant="rectangular" width={80} height={30} style={{ marginTop: '5px' }} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginBottom: '10px' }}>
        Add Opening Hour
      </Button>

      {openingHours.length === 0 ? (
        <Typography sx={{ mt: 6, textAlign: 'center' }} variant="h6">No opening hours set yet</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="opening hours table">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>From Hour</TableCell>
                <TableCell>To Hour</TableCell>
                <TableCell>Is Closed</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {openingHours.map((hour) => (
                <TableRow key={hour.id}>
                  <TableCell>{hour.day_display}</TableCell>
                  <TableCell>{hour.from_hour}</TableCell>
                  <TableCell>{hour.to_hour}</TableCell>
                  <TableCell>{hour.is_closed ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleEdit(hour)}
                      style={{ marginRight: '5px' }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => handleDelete(hour.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <OpeningHourFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={selectedHour}
        mode={modalMode}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    </Box>
  );
};

export default OpeningHoursList;
