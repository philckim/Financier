const express = require("express");
const keys = require("../../config/default.json");
const plaid = require("plaid");
const router = express.Router();
const moment = require("moment");
const auth = require("../../middleware/auth");
const ObjectId = require('mongodb').ObjectID;

const User = require("../../models/User");
const Account = require("../../models/Account");
const HttpError = require("../../models/Http-Error");

/**
 *  configure plaid api w/ api keys
 */
const client = new plaid.Client({
  clientID: keys.PLAID_CLIENT_ID,
  secret: keys.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

/**
 *  @route   GET api/plaid
 *  @desc    Create a temp Link token to exchange with plaid api
 *  @access  Private
 */
router.get("/create-link-token", auth, async (req, res, next) => {
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
    const error = new HttpError('Server Error.', 500);
    return next(error);
  }
});

/**
 *  @route   POST api/plaid
 *  @desc    Plaid token exchange:
 *  @params  {body: publicToken, metadata, auth.token, headers: 'x-auth-token'}
 *  @access  Private
 */
router.post("/token-exchange", auth, async (req, res, next) => {

  /**
   *  Send token through auth middleware -> decode token and asign userId to user
   */
  const user = await User.findById(req.user.userId);
  
  /**
   *  Pull linked bank acount info from meta data 
   */
  const institution = req.body.metadata.institution;
  const { name, institution_id } = institution;

    try {
      console.log('Attempting backend plaid token exchange...')
      const { publicToken } = req.body;
      const { access_token: accessToken, item_id: itemId } = await client.exchangePublicToken(publicToken);
      // console.log(`accessToken: ${accessToken}, itemId: ${itemId}`);

      /**
       *  onSuccess -> save access_token for future use
       */
      if(accessToken) {
        // Check if account exists
        let account = await Account.findOne({
          userId: user.id,
          institutionId: institution_id
        })

        if(account) {
          const error = new HttpError('Account already linked!', 405);
          return next(error);
        } else {
          /**
           *  Create account and save to DB
           */
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
      
      console.log('token exchange success!')
   } catch (err) {
      const error = new HttpError('Server Error', 500);
      return next(error);
   }
});

/**
 *  @route  GET api/plaid/accounts
 *  @desc   Get all accounts linked with plaid for a specific user
 *  @access Private
 */
router.get('/accounts', auth, async (req, res, next) => {
  const userId = req.user.userId;
  const objId = new ObjectId(userId);

  let accounts;
  try {
    accounts = await Account.find({ userId: objId });

  } catch (err) { 
    console.log('err: ',err);
    return next(new HttpError('Server Error', 500));
  }
  if(!accounts) {
    console.log(`No accounts found for user: ${req.user.name}`);
    return next(new HttpError('No accounts found.', 404));
  }
  res.json({
    accounts: accounts.map((account) =>
      account.toObject({ getters: true })
    ),
  });
  
});

/**
 *  @route  DELETE api/plaid/accounts/:id
 *  @desc   Delete target account linked with plaid for a specific user
 *  @access Private
 */
router.delete('/accounts/:id', auth, async (req, res) => {
  Account.findById(req.params.id).then(account => {
    account.remove().then(() => res.json({ success: true }));
  });
});

/**
 *  @todo   convert this to take in itemId and only pull data for that item
 *  @route  POST api/plaid/accounts/data
 *  @desc   Get balance and transaction data for accounts
 *  @access Private
 */
router.post('/accounts/data', auth, async (req, res, next) => {
  /** Setup date ranges */
  const now = moment();
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");

  try {
    // pulls userId out of the req, use userId to cast to new objectId, ref ObjectId to find account in mongoDB.
    const userId = req.user.userId;
    const objId = new ObjectId(userId);
    const [accounts] = await Account.find({userId: objId});

    if(!accounts.accessToken){
      const error = new HttpError('Invalid AccessToken!', 401);
      return next(error);
    } else {
      // Fetch account data from plaid
      const balanceResponse = await client.getBalance(accounts.accessToken);
      const transactionResponse = await client.getTransactions(
        accounts.accessToken,
        thirtyDaysAgo,
        today, 
        { count: 50, offset: 0 }
      );

      // return data
      console.log(`BalanceResponse: ${balanceResponse}`);
      console.log(`transactionResponse: ${transactionResponse}`);
      res.json({ balanceResponse, transactionResponse });
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError('Server Error', 500);
    return next(error);
  } 
});

/**
 *  @todo   convert this to take in itemId and only pull data for that item
 *  @route  POST api/plaid/income/get
 *  @desc   Get total income
 *  @access Private
 */
router.post('/income', auth, async (req, res, next) => {
  console.log(`Attempting to fetch user income...`);
  const userId = req.user.userId;
  const objId = new ObjectId(userId);

  try {
    const [accounts] = await Account.find({ userId: objId });
    console.log(`Account retrieval success -> accessToken: ${accounts.accessToken}`);

    if(!accounts) {
      console.log(`No accounts found for user: ${req.user.name}`);
      return next(new HttpError('No accounts found.', 404));
    }else {
      const { incomeResponse } = client.getIncome(accounts.accessToken);
      console.log(`api call success -> data: ${incomeResponse}`);
      let income = 0;

      if(incomeResponse) {
        income = incomeResponse.income; 
      }
      res.json(income);
    }
  
  } catch (err) { 
    return next(new HttpError('Server Error', 500));
  }
})


module.exports = router;
