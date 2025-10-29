import * as React from 'react';
import DashboardLayout from '../DashboardLayout';
import PaymentForm from './parts/PaymentMethod';


export default function PaymentMethod() {
  return (
    <DashboardLayout>
        <PaymentForm />
    </DashboardLayout>
  );
}
