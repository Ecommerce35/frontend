import * as React from 'react';
import Reviews from './parts/Reviews';
import Header from '../../partials/Header';
import Container from '@mui/material/Container';



export default function CustomerReviews() {
  return (
    <>
      <Header />
      <Container 
        maxWidth="lg"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9f9f9',
            padding: 3,
            borderRadius: 0,
            boxShadow: 0,
          }}
      >
        <Reviews />
      </Container>
    </>
  );
}
