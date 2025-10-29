import * as React from 'react';
import OrderTable from './parts/OrderedProducts';
import Header from '../../partials/Header';
import Container from '@mui/material/Container';



export default function CustomerOrders() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <OrderTable />
      </Container>
    </>
  );
}
