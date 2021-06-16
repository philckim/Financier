const express = require("express");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;
const plaid = require("plaid");
const router = express.Router();

const Account = require("../models/Account");
const auth = require("../middleware/auth");
const HttpError = require("../models/Http-Error");
const keys = require("../config/production.json");

/** Plaid api w/ api keys */
const client = new plaid.Client({
  clientID: keys.PLAID_CLIENT_ID,
  secret: keys.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

/**
 *  @route  GET api/accounts
 *  @desc   Get all accounts linked with plaid for a specific user
 *  @access Private
 */
router.get("/", auth, async (req, res, next) => {
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
 *  @route  GET api/accounts/:accountId
 *  @desc   Get balance and transaction data for accounts
 *  @access Private
 */
router.get("/:accountId", auth, async (req, res, next) => {
  /** Setup date ranges */
  const now = moment();
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");

  /** Pull target accountId out of url parmas */
  const accountId = req.params.accountId;

  if (!accountId) {
    const error = new HttpError("Could not fetch account", 404);
    return next(error);
  }

  let accountData;
  try {
    accountData = await Account.findOne({ _id: accountId });
  } catch (err) {
    const error = new HttpError("Could not fetch account data.", 500);
    return next(error);
  }

  if (!accountData.accessToken) {
    const error = new HttpError("Invalid access token.", 401);
    return next(error);
  }

  /** Fetch account data from plaid */
  let balanceResponse, transactionResponse;
  try {
    balanceResponse = await client.getBalance(accountData.accessToken);
    transactionResponse = await client.getTransactions(
      accountData.accessToken,
      thirtyDaysAgo,
      today,
      { count: 10, offset: 0 }
    );
  } catch (err) {
    const error = new HttpError("Could not fetch transactions.", 500);
    return next(error);
  }

  /** Fetch institution name for header */
  let institutionResponse;
  try {
    institutionResponse = await client.getInstitutionById(
      balanceResponse.item.institution_id,
      ["US"]
    );
  } catch (err) {
    const error = new HttpError("Could not fetch institution.", 500);
    return next(error);
  }

  /** In the event no institution was found */
  if (!institutionResponse) {
    const error = new HttpError("Could not find institution.", 404);
    return next(error);
  }

  res.json({ balanceResponse, transactionResponse, institutionResponse });
});

/**
 *  @route  DELETE api/accounts/:accountId
 *  @desc   Delete target account linked with plaid for a specific user
 *  @access Private
 */
router.delete("/:accountId", auth, async (req, res) => {
  let account;
  try {
    account = Account.findById(req.params.accountId);
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
 * Returns detail for individual accounts (ie chase checking, savings)
 * @route GET api/accounts/:accountId/:subaccountId
 * @access Private
 */
router.get("/:accountId/:subAccountId", auth, async (req, res, next) => {
  /** Setup date ranges */
  const now = moment();
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");

  /** Pull target accountId out of url parmas */
  const accountId = req.params.accountId;
  const subAccountId = req.params.subAccountId;

  if (!accountId || !subAccountId) {
    const error = new HttpError("Could not fetch account", 404);
    return next(error);
  }

  /** Account data for the specified account */
  let accountData;
  try {
    accountData = await Account.findOne({ _id: accountId });
  } catch (err) {
    const error = new HttpError("Could not fetch account data.", 500);
    return next(error);
  }

  if (!accountData.accessToken) {
    const error = new HttpError("Invalid access token.", 401);
    return next(error);
  }

  /** Fetch account data from plaid */
  let balanceResponse, transactionResponse;
  try {
    balanceResponse = await client.getBalance(accountData.accessToken, {
      account_ids: [subAccountId],
    });
    transactionResponse = await client.getTransactions(
      accountData.accessToken,
      thirtyDaysAgo,
      today,
      { account_ids: [subAccountId], count: 10, offset: 0 }
    );
  } catch (err) {
    const error = new HttpError("Could not fetch transactions.");
    return next(error);
  }

  res.json({ balanceResponse, transactionResponse });
});

module.exports = router;
