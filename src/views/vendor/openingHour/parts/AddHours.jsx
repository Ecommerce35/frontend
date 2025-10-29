import React from 'react';
import { Modal, Box, TextField, MenuItem, FormControl, InputLabel, Select, Checkbox, FormControlLabel, Button } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import api from '../../../../api/api';
import Swal from 'sweetalert2';


// Constants for Days and Times
const DAYS = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
];

const TIME = [
    '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM',
    '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
  ];

const OpeningHourFormModal = ({ open, onClose, initialValues, mode, onSubmitSuccess }) => {
  const isEditMode = mode === 'edit';


    const handleSubmit = async (values) => {
        try {
            if (isEditMode) {
            // PUT request for editing an existing opening hour
            await api.put(`/vendor/opening-hours/${values.id}/`, values);
            } else {
            // POST request for adding a new opening hour
            await api.post('/vendor/opening-hours/', values);
            }

            // Show success message
            Swal.fire({
            title: 'Success!',
            text: `Opening hour ${isEditMode ? 'updated' : 'added'} successfully.`,
            icon: 'success',
            confirmButtonText: 'OK',
            });

            // Trigger callbacks on success
            onSubmitSuccess();
            onClose();
        } catch (error) {
            onClose();
            // Extract detailed error message
            const errors = error.response?.data;
            const nonFieldErrors = errors?.non_field_errors?.join(', ') || null;
            const errorMessage =
              nonFieldErrors || errors?.detail || 'An unexpected error occurred.';
        
            // Show error message in SweetAlert
            Swal.fire({
              title: 'Error!',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK',
            });
        
        }
    };


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, padding: 3, margin: 'auto', marginTop: '10%', backgroundColor: 'white', borderRadius: 2 }}>
        <h2>{isEditMode ? 'Edit Opening Hour' : 'Add Opening Hour'}</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <FormControl fullWidth margin="normal">
              <InputLabel>Day</InputLabel>
              <Field as={Select} name="day" fullWidth label="Day" required>
                {DAYS.map((day) => (
                  <MenuItem key={day.value} value={day.value}>
                    {day.label}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>From Hour</InputLabel>
              <Field as={Select} name="from_hour" fullWidth label="From Hour" required>
                {TIME.map((time, index) => (
                  <MenuItem key={index} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>To Hour</InputLabel>
              <Field as={Select} name="to_hour" fullWidth label="To Hour" required>
                {TIME.map((time, index) => (
                  <MenuItem key={index} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <FormControlLabel
              control={<Field as={Checkbox} name="is_closed" />}
              label="Is closed"
            />

            <Button variant="contained" type="submit" color="primary" fullWidth>
              {isEditMode ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default OpeningHourFormModal;
