// /src/utils/stripe.js
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_live_51RTYhaB3KzN8XjUWtf9lVAO1CFKjPtjqb7juBDMTRaiJA7oJRmfDjVZPNDdyah095hrXMKI4wabf6NLJJEtliaIr00yVRD0bzw'); // your LIVE public key here
  }
  return stripePromise;
};

export default getStripe;
