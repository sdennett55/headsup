const functions = require('firebase-functions');
var express = require('express');
var stripeLoader = require('stripe');

const router = express.Router();

const stripe = new stripeLoader(functions.config().stripe.token);

const charge = (token, amount=99) => {
  return stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: token,
    description: 'Statement Description'
  })
}

router.post('/api/donate', async (req, res, next) => {
  try {
    let data = await charge(req.body.token.id, req.body.amount);
    res.send("Charged!");
  } catch(e) {
    res.status(500);
  }
});

module.exports = router;