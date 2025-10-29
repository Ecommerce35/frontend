import * as React from 'react';
import SellerProducts from './ProductList';
import DashboardLayout from '../DashboardLayout';

export default function ProductList() {
  return (
    <DashboardLayout>
        <SellerProducts />
    </DashboardLayout>
  );
}
