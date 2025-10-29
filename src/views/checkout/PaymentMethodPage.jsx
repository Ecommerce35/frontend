import * as React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const Card = styled(MuiCard)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  width: '100%',
  '&:hover': {
    background:
      'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
    borderColor: 'primary.light',
    boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
    ...theme.applyStyles('dark', {
      background:
        'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
      borderColor: 'primary.dark',
      boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
    }),
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: theme.palette.primary.light,
        ...theme.applyStyles('dark', {
          borderColor: theme.palette.primary.dark,
        }),
      },
    },
  ],
}));


export default function PaymentForm() {
  const [paymentType, setPaymentType] = React.useState(
    () => localStorage.getItem('paymentType') || 'creditCard'
  );
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');

  // Save the selected payment method to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('paymentType', paymentType);
  }, [paymentType]);


  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };


  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Card selected={paymentType === 'creditCard'}>
            <CardActionArea
              onClick={() => setPaymentType('creditCard')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardRoundedIcon
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: 'grey.400',
                      ...theme.applyStyles('dark', {
                        color: 'grey.600',
                      }),
                    }),
                    paymentType === 'creditCard' && {
                      color: 'primary.main',
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: 'medium' }}>Card or Mobile Money</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card selected={paymentType === 'cashOnDelivery'}>
            <CardActionArea
              onClick={() => setPaymentType('cashOnDelivery')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoneyIcon
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: 'grey.400',
                      ...theme.applyStyles('dark', {
                        color: 'grey.600',
                      }),
                    }),
                    paymentType === 'cashOnDelivery' && {
                      color: 'primary.main',
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: 'medium' }}>Cash on Delivery</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card selected={paymentType === 'bankTransfer'}>
            <CardActionArea
              onClick={() => setPaymentType('bankTransfer')}
              disabled
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceRoundedIcon
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: 'grey.400',
                      ...theme.applyStyles('dark', {
                        color: 'grey.600',
                      }),
                    }),
                    paymentType === 'bankTransfer' && {
                      color: 'primary.main',
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: 'medium' }}>Bank account (This method is currently unavailable)</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>

      {paymentType === 'creditCard' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            <strong>Note:</strong> Ensure that your mobile wallet is funded and you have the necessary PIN or authorization method ready to complete the transaction. 
            This option is fast, secure, and convenient for mobile users.
          </Alert>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Credit card or Mobile Money
          </Typography>
          <Typography variant="body1" gutterBottom>
              Pay securely using your credit or debit card. We accept all major cards, including Visa, MasterCard, and American Express. 
              Your card details are encrypted and processed securely through our payment gateway to ensure the safety of your information.
          </Typography>
        </Box>
      )}
      {paymentType === 'cashOnDelivery' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
          Pay for your order in cash when it is delivered to your doorstep. 
          Please ensure the exact amount is ready as the delivery agent may not carry change
          </Alert>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Cash on delivery
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Note:</strong> This option is only available for certain locations. Make sure someone is present at the delivery address to avoid any delays. You will be notified via call or SMS prior to the delivery
          </Typography>
        </Box>
      )}
      {paymentType === 'bankTransfer' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Your order will be processed once we receive the funds.
          </Alert>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Bank account
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please transfer the payment to the bank account details shown below.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Bank:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              Mastercredit
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Account number:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              123456789
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Routing number:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              987654321
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}