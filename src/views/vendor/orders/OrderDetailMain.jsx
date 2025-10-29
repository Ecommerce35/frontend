import * as React from 'react';
import DashboardLayout from '../DashboardLayout';
import OrderDetail from './parts/OrderDetail'


export default function VendorOrderDetail() {
  return (
    <DashboardLayout>
        <OrderDetail />
    </DashboardLayout>
  );
}
