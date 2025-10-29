import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ChartContent = () => {
  return (
    <Box sx={{ mt: 5, p: 1, border: '1px solid #e0e0e0', borderRadius: 2 }}>
      <Typography variant="h6" component="div" gutterBottom>
        Size Guide
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Men’s Clothing Size Chart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell align="center">Chest (inches)</TableCell>
              <TableCell align="center">Waist (inches)</TableCell>
              <TableCell align="center">Neck (inches)</TableCell>
              <TableCell align="center">Sleeve (inches)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Small (S)</TableCell>
              <TableCell align="center">34-36</TableCell>
              <TableCell align="center">28-30</TableCell>
              <TableCell align="center">14-14.5</TableCell>
              <TableCell align="center">32-33</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Medium (M)</TableCell>
              <TableCell align="center">38-40</TableCell>
              <TableCell align="center">32-34</TableCell>
              <TableCell align="center">15-15.5</TableCell>
              <TableCell align="center">33-34</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Large (L)</TableCell>
              <TableCell align="center">42-44</TableCell>
              <TableCell align="center">36-38</TableCell>
              <TableCell align="center">16-16.5</TableCell>
              <TableCell align="center">34-35</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>X-Large (XL)</TableCell>
              <TableCell align="center">46-48</TableCell>
              <TableCell align="center">40-42</TableCell>
              <TableCell align="center">17-17.5</TableCell>
              <TableCell align="center">35-36</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>XX-Large (XXL)</TableCell>
              <TableCell align="center">50-52</TableCell>
              <TableCell align="center">44-46</TableCell>
              <TableCell align="center">18-18.5</TableCell>
              <TableCell align="center">36-37</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" sx={{ mt: 4 }} gutterBottom>
        Women’s Clothing Size Chart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell align="center">Bust (inches)</TableCell>
              <TableCell align="center">Waist (inches)</TableCell>
              <TableCell align="center">Hips (inches)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Small (S)</TableCell>
              <TableCell align="center">32-34</TableCell>
              <TableCell align="center">24-26</TableCell>
              <TableCell align="center">34-36</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Medium (M)</TableCell>
              <TableCell align="center">36-38</TableCell>
              <TableCell align="center">28-30</TableCell>
              <TableCell align="center">38-40</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Large (L)</TableCell>
              <TableCell align="center">40-42</TableCell>
              <TableCell align="center">32-34</TableCell>
              <TableCell align="center">42-44</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>X-Large (XL)</TableCell>
              <TableCell align="center">44-46</TableCell>
              <TableCell align="center">36-38</TableCell>
              <TableCell align="center">46-48</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>XX-Large (XXL)</TableCell>
              <TableCell align="center">48-50</TableCell>
              <TableCell align="center">40-42</TableCell>
              <TableCell align="center">50-52</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ChartContent;
