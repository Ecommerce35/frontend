import * as React from 'react';
import RecentProducts from './parts/RecentProducts';
import Header from '../../partials/Header';
import Container from '@mui/material/Container';



export default function RecentlyViewedProducts() {
  return (
    <>
      <Header />
      <Container 
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
        <RecentProducts />
      </Container>
    </>
  );
}
