import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCart } from '../../utils/CartContext';

export default function Review() {
  const { cartCount, orderSummary, address } = useCart(); 
  const paymentType = localStorage.getItem('paymentType');
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary={`${cartCount} selected`} />
          <Typography variant="body2">GHS{orderSummary.totalAmount.toFixed(2)}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Delivery Fee" secondary="Based on distance between you and seller(s) and the Delivery option(s) selected" />
          <Typography variant="body2">GHS{orderSummary.deliveryFee.toFixed(2)}</Typography>
        </ListItem>
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          GHS{orderSummary.grandTotal.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>{address.full_name} </Typography>
          <Typography gutterBottom>{address.country} </Typography>
          <Typography gutterBottom>{address.region} </Typography>
          <Typography gutterBottom>{address.town} </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {address.address}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment >
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Payment Method: 
                  </Typography>
                  <Typography variant="body1">{paymentType}</Typography>
                </Stack>
              </React.Fragment>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}