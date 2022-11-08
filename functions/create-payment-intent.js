const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(
  "sk_test_51M1ALdDCvBmq3iWu2tmFzdmlbwRsWMWDJnFBraQZ7TGBt4kz2gUe1mpHMG0xDeoX6GnrCaufapSPl0yFcoStLUaS00VrZ8ty5h"
);
exports.handler = async function(event, context) {
  const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

  const calculateOrderAmount = () => {
    return shipping_fee + total_amount;
  };
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd"
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
