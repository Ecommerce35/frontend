import * as React from 'react';
import OrderTable from './parts/OrderedProducts';
import DashboardLayout from '../DashboardLayout';



export default function VendorOrders() {
  return (
    <DashboardLayout>
        <OrderTable />
    </DashboardLayout>
  );
}
