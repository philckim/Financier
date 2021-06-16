const jwt = require("jsonwebtoken");
const config = require("config");

const HttpError = require("../models/Http-Error");

module.exports = (req, res, next) => {
  /** Token from header */
  const token = req.header("x-auth-token");

  if (!token) {
    throw new HttpError("No token, authorization denied", 403);
  }

  try {
    /** Checks token to validate user */
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    const error = new HttpError("Token validation failed.", 403);
    return next(error);
  }
};
