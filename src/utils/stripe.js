// src/utils/stripe.js
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51RTYhiPZu2cKz2PwoGYw2uJ1KfbUGK2OjMc2unsyKB4G9KybbEMzpQoN7PYm6d65RfsxwrTSkpOZhGScWeeNzf5m00krLb3w2b');
  }
  return stripePromise;
};

export default getStripe;
