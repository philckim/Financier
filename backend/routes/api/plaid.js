const express = require("express");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;
const plaid = require("plaid");
const router = express.Router();

const Account = require("../../models/Account");
const auth = require("../../middleware/auth");
const HttpError = require("../../models/Http-Error");
const keys = require("../../config/default.json");
const User = require("../../models/User");

/** Plaid api w/ api keys */
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
  let user;
  try {
    user = await User.findById(req.user.userId);
  } catch (err) {
    const error = new HttpError("Could not fetch account.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user.", 404);
    return next(error);
  }

  let linkToken;
  try {
    linkToken = await client.createLinkToken({
      user: {
        client_user_id: user.id,
      },
      client_name: "SandboxUser",
      products: ["auth", "identity", "transactions"],
      country_codes: ["US"],
      language: "en",
    });
  } catch (err) {
    const error = new HttpError("Could not create link token.", 500);
    return next(error);
  }

  res.json(linkToken.link_token);
});

/**
 *  @route   POST api/plaid
 *  @desc    Plaid token exchange:
 *  @params  {body: publicToken, metadata, auth.token, headers: 'x-auth-token'}
 *  @access  Private
 */
router.post("/token-exchange", auth, async (req, res, next) => {
  /** Send token through auth middleware -> decode token and asign userId to user */
  const user = await User.findById(req.user.userId);

  /** Pull linked bank acount info from meta data */
  const institution = req.body.metadata.institution;
  const { name, institution_id } = institution;

  const { publicToken } = req.body;

  let accessToken, itemId;
  try {
    const { access_token, item_id } = await client.exchangePublicToken(
      publicToken
    );
    accessToken = access_token;
    itemId = item_id;
  } catch (err) {
    const error = new HttpError("Could not retrieve access token.", 500);
    return next(error);
  }

  /** Check if account already exists */
  let account;
  try {
    account = await Account.findOne({
      userId: user.id,
      institutionId: institution_id,
    });
  } catch (err) {
    const error = new HttpError("Could not fetch account.", 500);
    return next(error);
  }

  if (account) {
    const error = new HttpError("Account already linked.", 405);
    return next(error);
  }

  /** Create account and save to DB  */
  try {
    account = new Account({
      userId: user.id,
      accessToken: accessToken,
      itemId: itemId,
      institutionId: institution_id,
      institutionName: name,
    });
    account.save();
  } catch (err) {
    const error = new HttpError("Could not create account.", 500);
    return next(error);
  }

  res.json(account);
});

/**
 *  @route  GET api/plaid/accounts
 *  @desc   Get all accounts linked with plaid for a specific user
 *  @access Private
 */
router.get("/accounts", auth, async (req, res, next) => {
  const userId = req.user.userId;
  const objId = new ObjectId(userId);

  let accounts;
  try {
    accounts = await Account.find({ userId: objId });
  } catch (err) {
    return next(new HttpError("Could not fetch accounts.", 500));
  }

  if (!accounts) {
    const error = new HttpError("No accounts found.", 404);
    return next(error);
  }

  res.json({
    accounts: accounts.map((account) => account.toObject({ getters: true })),
  });
});

/**
 *  @route  DELETE api/plaid/accounts/:id
 *  @desc   Delete target account linked with plaid for a specific user
 *  @access Private
 */
router.delete("/accounts/:id", auth, async (req, res) => {
  let account;
  try {
    account = Account.findById(req.params.id);
  } catch (err) {
    const error = new HttpError("Error fetching account.", 500);
    return next(error);
  }

  if (!account) {
    const error = new HttpError("Could not find account.", 404);
    return next(error);
  }

  account.remove().then(() => res.json({ success: true }));
});

/**
 *  @todo   convert this to take in itemId and only pull data for that item
 *  @route  POST api/plaid/accounts/data
 *  @desc   Get balance and transaction data for accounts
 *  @access Private
 */
router.post("/accounts/data", auth, async (req, res, next) => {
  /** Setup date ranges */
  const now = moment();
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");

  /** pulls userId out of the req, use userId to cast to new objectId, ref ObjectId to find account in mongoDB. */
  const userId = req.user.userId;
  const objId = new ObjectId(userId);

  let accounts;
  try {
    accounts = await Account.find({ userId: objId });
  } catch (err) {
    const error = new HttpError("Could not fetch accounts.", 500);
    return next(error);
  }

  if (!accounts.accessToken) {
    const error = new HttpError("Invalid access token.", 401);
    return next(error);
  }

  /** Fetch account data from plaid */
  let balanceResponse, transactionResponse;
  try {
    balanceResponse = await client.getBalance(accounts.accessToken);
    transactionResponse = await client.getTransactions(
      accounts.accessToken,
      thirtyDaysAgo,
      today,
      { count: 50, offset: 0 }
    );
  } catch (err) {
    const error = new HttpError("Could not fetch transactions.");
    return next(error);
  }

  res.json({ balanceResponse, transactionResponse });
});

/**
 *  @todo   convert this to take in itemId and only pull data for that item
 *  @route  POST api/plaid/income/get
 *  @desc   Get total income
 *  @access Private
 */
router.post("/income", auth, async (req, res, next) => {
  const userId = req.user.userId;
  const objId = new ObjectId(userId);

  let accounts;
  try {
    accounts = await Account.find({ userId: objId });
  } catch (err) {
    const error = new HttpError("Error fetching accounts.", 500);
    return next(error);
  }

  if (!accounts) {
    const error = new HttpError("No accounts found.", 404);
    return next(error);
  }

  let incomeResponse;
  try {
    incomeResponse = client.getIncome(accounts.accessToken);
  } catch (err) {
    const error = new HttpError("Could not fetch income.", 500);
    return next(error);
  }

  res.json(incomeResponse.income || 0);
});

module.exports = router;
