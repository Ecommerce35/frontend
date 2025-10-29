import * as React from 'react';
import OrderDetail from './parts/OrderDetail'
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import Container from '@mui/material/Container';

export default function CustomerOrderDetail() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <OrderDetail />
      </Container>
      <Footer />
    </>
  );
}
