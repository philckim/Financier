const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const moment = require("moment");
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
 *  @todo   convert this to take in itemId and only pull data for that item
 *  @route  POST api/income
 *  @desc   Get total income
 *  @access Private
 */
router.get("/", auth, async (req, res, next) => {
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

/**
 *  @route  GET api/income/:timeFrame
 *  @desc   Get income based on time frame
 *  @access Private
 */
router.get("/:timeFrame", auth, async (req, res, next) => {
  const userId = req.user.userId;
  const timeFrame = req.params.timeFrame;
  const objId = new ObjectId(userId);

  if (
    isNaN(parseInt(timeFrame)) ||
    parseInt(timeFrame) > 12 ||
    parseInt(timeFrame) < 0
  ) {
    const error = new HttpError("Invalid input passed.", 403);
    return next(error);
  }

  /** Account for user */
  let userAccount;
  try {
    userAccount = await Account.find({ userId: objId });
  } catch (err) {
    const error = new HttpError("Error fetching accounts.", 500);
    return next(error);
  }

  if (!userAccount) {
    const error = new HttpError("No accounts found.", 404);
    return next(error);
  }

  /** Transactions found in server */
  let transactionResponse;
  try {
    transactionResponse = await client.getTransactions(
      userAccount[0].accessToken,
      moment().subtract(timeFrame.toString(), "months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
      { count: 300, offset: 0 }
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("Error fetching transactions.", 500);
    return next(error);
  }

  if (!transactionResponse) {
    const error = new HttpError("No transactions found.", 404);
    return next(error);
  }

  res.json({ transactionResponse });
});

module.exports = router;
