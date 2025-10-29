import * as React from 'react';
import { BarChart } from '@mui/x-charts';

export default function ProductPerformanceChart({ data }) {
  return (
    <BarChart
      xAxis={[{ data: data.map((product) => product.name), label: 'Product' }]} // X-axis: product names
      series={[
        {
          data: data.map((product) => product.sales), // Y-axis: sales count
          label: 'Sales',
        },
      ]}
      height={300}
      width="100%"
    />
  );
}
