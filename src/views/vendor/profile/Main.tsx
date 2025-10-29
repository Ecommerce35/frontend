
import * as React from 'react';
import MyProfile from './parts/MyProfile';
import DashboardLayout from '../DashboardLayout';

export default function VendorProfile(props) {
  return (
    <DashboardLayout >
        <MyProfile />
    </DashboardLayout>
  );
}
