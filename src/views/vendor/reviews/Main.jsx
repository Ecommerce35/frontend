import * as React from 'react';

import DashboardLayout from '../DashboardLayout';
import ProductReviews from './parts/ReviewData'

export default function VendorReviews() {
  return (
    <DashboardLayout>
        <ProductReviews />
    </DashboardLayout>
  );
}
