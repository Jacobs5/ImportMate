import React from 'react';
import getStripe from '../utils/stripe.js';

function Upgrade() {
  const handleUpgrade = async () => {
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1RYmEKB3KzN8XjUWdDY98YPQ', // Your actual Stripe Price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: window.location.origin + '/account',
      cancelUrl: window.location.origin + '/upgrade',
    });

    if (error) {
      console.error('Stripe Checkout Error:', error);
    }
  };

  return (
    <div className="container text-white">
      <h1 className="text-2xl font-bold text-brand-blue mb-4">
        Upgrade to ImportMate Premium
      </h1>
      <p className="mb-4">
        Get unlimited supplier chats, AI replies, full Vision Board access, and expert resources.
      </p>
      <button onClick={handleUpgrade} className="btn">
        Upgrade Now
      </button>
    </div>
  );
}

export default Upgrade;
