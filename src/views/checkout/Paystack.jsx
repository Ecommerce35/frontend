import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import api from '../../api/api'; // Import your Axios instance

const PaystackPayment = ({ amount, email }) => {
    const publicKey = 'pk_test_1a9405c84346cd5f9b41a65524aa546d859be3d0';
    const [reference, setReference] = useState("");

    const onSuccess = (reference) => {
        // Payment was successful, call your backend to verify it
        api
          .get(`/api/v1/payments/verify-payment/${reference.reference}`)
          .then((response) => {
              const { message } = response.data;
              if (response.status === 200) {
                  alert("Payment Complete!");
              } else {
                  alert("Verification Failed!");
              }
          })
          .catch((error) => {
              console.error("Error verifying payment:", error);
              alert("An error occurred while verifying payment.");
          });
    };

    const onClose = () => {
        console.log('Payment dialog closed');
    };

    return (
        <div>
            <PaystackButton
                email={email}
                currency="GHS" 
                amount={amount * 100}  // Paystack requires amounts in kobo
                publicKey={publicKey}
                onSuccess={onSuccess}
                onClose={onClose}
                text="Pay Now"
            />
        </div>
    );
};

export default PaystackPayment;
