const express = require("express");
const keys = require("../../config/default.json");
const plaid = require("plaid");
const router = express.Router();
const moment = require("moment");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Account = require("../../models/Account");

// configure plaid api w/ api keys
const client = new plaid.Client({
  clientID: keys.PLAID_CLIENT_ID,
  secret: keys.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

// @route   GET api/plaid
// @desc    Create a temp Link token to exchange with plaid api
// @access  Public
router.get("/create-link-token", auth, async (req, res) => {
  console.log("received");
  const user = await User.findById(req.user.userId);
  try {
    // console.log(user);
    // console.log(`backend create-link-token req by: ${user.id}`);
    const { link_token: linkToken } = await client.createLinkToken({
      user: {
        client_user_id: user.id,
      },
      client_name: "SandboxUser",
      products: ["auth", "identity", "transactions"],
      country_codes: ["US"],
      language: "en",
    });

    res.json({ linkToken });
    console.log("create-link-token success! token: ", { linkToken });
  } catch (err) {
    return res.send({ err: err.message });
  }
});

// @route   POST api/plaid
// @desc    Plaid token exchange
// @access  Public
router.post("/token-exchange", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  // console.log(req.body);
  const { publicToken } = req.body.publicToken;

  try {
    console.log("backend token exchange...");
    const { publicToken } = req.body;
    const { access_token: accessToken } = await client.exchangePublicToken(
      publicToken
    );

    //fetch account data from plaid api
    const balanceResponse = await client.getBalance(accessToken);
    const transactionResponse = await client.getTransactions(
      accessToken,
      moment().subtract("3", "months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
      { count: 300, offset: 0 }
    );

    // console.log('Account Balance: ', balanceResponse);
    // console.log('Transaction Data: ', transactionResponse);
    res.json({ balanceResponse, transactionResponse });
    console.log("token exchange success!");
  } catch (err) {
    return res.send({ err: err.message });
  }
});

// @route GET api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private
router.get("/accounts", auth, (req, res) => {
  Account.find({ userId: req.user.id })
    .then((accounts) => res.json(accounts))
    .catch((err) => console.log(err));
});

// @route POST api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private

module.exports = router;
