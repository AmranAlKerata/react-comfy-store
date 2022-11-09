// Important to be able to use .env file
import { config } from "dotenv";
config();

const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

// This is netlify function syntax => https://www.netlify.com/products/functions/

export async function handler(event, context) {
  // Check if there is data coming from the post request
  if (event.body) {
    // Get the data that coming form the post request
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    // Calculate the total price with the shipping fee
    const totalAmount = () => total_amount + shipping_fee;

    try {
      // Create a stripe payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount(),
        currency: "usd"
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }) // retrun the unique clientSecret
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }
  } else {
    return {
      statusCode: 200,
      body: "Create Payment Intent"
    };
  }
}
