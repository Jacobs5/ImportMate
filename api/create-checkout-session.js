// /api/create-checkout-session.js

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1RTYmGPZu2cKz2Pw5XxJfrHg", // Your premium Price ID
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/upgrade-success`,
      cancel_url: `${req.headers.origin}/upgrade-cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
}
