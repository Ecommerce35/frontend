import * as React from 'react';
import AccountSecurity from './parts/AccountSecurity';
import Header from '../../partials/Header';
import Container from '@mui/material/Container';



export default function PasswordManagement() {
  return (
    <>
      <Header />
      <Container 
        maxWidth="sm"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            backgroundColor: '#f9f9f9',
            padding: 3,
            borderRadius: 0,
            boxShadow: 0,
          }}
      >
        <AccountSecurity />
      </Container>
    </>
  );
}
