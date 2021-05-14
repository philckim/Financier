const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const plaid = require("plaid");
const router = express.Router();

const Account = require("../models/Account");
const auth = require("../middleware/auth");
const HttpError = require("../models/Http-Error");
const keys = require("../config/default.json");

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

module.exports = router;
