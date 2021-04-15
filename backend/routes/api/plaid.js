const express = require('express');
const keys = require('../../config/default.json');
const plaid = require('plaid');
const router = express.Router();
const moment = require('moment');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Account = require('../../models/Account');

// configure plaid api w/ api keys
const client = new plaid.Client({
    clientID: keys.PLAID_CLIENT_ID,
    secret: keys.PLAID_SECRET,
    env: plaid.environments.sandbox
});

// @route   GET api/plaid
// @desc    Create a temp Link token to exchange with plaid api
// @access  Public
router.get('/create-link-token', auth, async (req, res) => {
    const user = await User.findById(req.user.id);

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
      // console.log('create-link-token success! token: ', {linkToken})

    } catch (err) {
        return res.send({ err: err.message })
    }
});

// @route   POST api/plaid
// @desc    Plaid token exchange
// @access  Public
router.post('/token-exchange', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log(req.body.metadata);
  const institution = req.body.metadata.institution;
  const { name, institution_id } = institution;

    try {
      console.log('Attempting backend plaid token exchange...')
      const { publicToken } = req.body;
      const { access_token: accessToken, item_id: itemId } = await client.exchangePublicToken(publicToken);

      // onSuccess -> save access_token for future use
      if(accessToken) {
        // Check if account exists
        // console.log(`accessToken: ${accessToken}, itemId: ${itemId}`);
        let account = await Account.findOne({
          userId: user.id,
          institutionId: institution_id
        })
        if(account) {
          console.log(`Account already linked!`);
        } else {
          // Create account and save to DB
          console.log('Account not found, Creating account...')
          account = new Account({
            userId: user.id,
            accessToken: accessToken,
            itemId: itemId,
            institutionId: institution_id,
            institutionName: name
          });

          account.save();
          // console.log(`Account created:  ${account}`);
          res.json(account)
        }
      }
      
      //fetch account data from plaid api
      // const balanceResponse = await client.getBalance(accessToken);
      // const transactionResponse = await client.getTransactions(
      //   accessToken,
      //   moment().subtract("3", "months").format("YYYY-MM-DD"),
      //   moment().format("YYYY-MM-DD"),
      //   { count: 300, offset: 0}
      // );

      // console.log('Account Balance: ', balanceResponse);
      // console.log('Transaction Data: ', transactionResponse);
      // res.json({ balanceResponse, transactionResponse });
      console.log('token exchange success!')
   } catch (err) {
      return res.send({ err: err.message })
   }
});

// @route GET api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private
router.get('/accounts', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });

    if(!accounts) {
      console.log(`No accounts found for user: ${req.user.name}`);
    }
    accounts.map(account => res.json(account));
  } catch (err) {
    return res.send({ err: err.message })
  }
});

// @route POST api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private

module.exports = router;