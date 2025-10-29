import * as React from 'react';
import OpeningHoursList from './parts/ListHours';
import DashboardLayout from '../DashboardLayout';



export default function OpeningHours() {
  return (
    <DashboardLayout>
        <OpeningHoursList />
    </DashboardLayout>
  );
}
