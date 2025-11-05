import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

export const MainGrid = ({ data }) => {

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <LineChart
            xAxis={[{ data: data.map((item) => item.month), label: 'Month' }]} // X-axis: months
            series={[
              {
                data: data.map((item) => item.order_count), // Y-axis: order counts
                label: 'Orders',
              },
            ]}
            height={300}
            width="100%"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const ProductPerformanceChart = ({ data }) => {
  console.log(data)
  return (

    <Box sx={{ width: '100%'}}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Sales
      </Typography>

      <BarChart
        xAxis={[
          {
            data: data.map((product) => product.product.title), // X-axis: product names
            label: 'Product',
            scaleType: 'band', // Ensure the x-axis type is set to "band" for categorical data
          },
        ]}
        series={[
          {
            data: data.map((product) => product.sales_count), // Y-axis: sales count
            label: 'Sales',
          },
        ]}
        height={300}
        width="100%"
      />
    </Box>
  );
}
