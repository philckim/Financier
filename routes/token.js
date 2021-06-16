const express = require("express");
const plaid = require("plaid");
const router = express.Router();

const Account = require("../models/Account");
const auth = require("../middleware/auth");
const HttpError = require("../models/Http-Error");
const keys = require("../config/production.json");
const User = require("../models/User");

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

module.exports = router;
