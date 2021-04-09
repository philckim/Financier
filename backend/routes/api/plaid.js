const express = require('express');
const keys = require('../../config/default.json');
const plaid = require('plaid');
const router = express.Router();
const moment = require('moment')

const User = require('../../models/User');
const Account = require('../../models/Account');

const client = new plaid.Client({
    clientID: keys.PLAID_CLIENT_ID,
    secret: keys.PLAID_SECRET,
    env: plaid.environments.sandbox
});

// @route   GET api/plaid
// @desc    Create a temp Link token to exchange with plaid api
// @access  Public
router.get('/create-link-token', async (req, res) => {
    try {
      const { link_token: linkToken } = await client.createLinkToken({
        user: {
          client_user_id: "unique id",
        },
        client_name: "SandboxUser",
        products: ["auth", "identity", "transactions"],
        country_codes: ["US"],
        language: "en",
      });

      res.json({ linkToken });

    } catch (err) {
        return res.send({ err: err.message })
    }
});

// @route   POST api/plaid
// @desc    Plaid token exchange
// @access  Public
router.post('/token-exchange', async (req, res) => {
    try {
      const { publicToken } = req.body;
      const { access_token: accessToken } = await client.exchangePublicToken(publicToken);

      const balanceResponse = await client.getBalance(accessToken);
      const transactionResponse = await client.getTransactions(
        accessToken,
        moment().subtract("3", "months").format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD"),
        { count: 300, offset: 0}
      );

      res.json({ balanceResponse, transactionResponse });
    } catch (err) {
      return res.send({ err: err.message })
    }
});

module.exports = router;