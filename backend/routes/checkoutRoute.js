import express from "express";
import Stripe from "stripe";
import { STRIPE_TEST_KEY } from "../config.js";

const router = express.Router();
const YOUR_DOMAIN = "https://mellostore.herokuapp.com/";

const stripe = new Stripe(STRIPE_TEST_KEY);

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  const cartItems = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    res.send(session.url);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
