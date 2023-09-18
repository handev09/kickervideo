import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function PaymentForm() {
  const stripe = useStripe('pk_test_51M0O2dGJ2TF8KMOz1bO6h24Pcqf06HmRvS4H1rKL9C1xQdjwXhW6snIkN9fmMFzShzbcoBwDlWWeyNVDl3BEeQlk00OzCHev3s');
  const elements = useElements();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
  
    const { paymentIntent, error } = await stripe.confirmCardPayment('pi_3NrhlDGJ2TF8KMOz1yksZAIX_secret_AQ6c2zGiMbPLuTR08CH93fNF3', {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Add billing details here
        },
      },
    });
  
    if (error) {
      console.error(error);
    } else if (paymentIntent.status === 'succeeded') {
      // Payment succeeded, handle success (e.g., show a success message, update UI)
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
