const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
const config = require("config");
const User = require("../../models/User");
const HttpError = require("../../models/Http-Error");

/**
 * @route   GET api/auth
 * @desc    Load User route
 * @access  Private
 */
router.get("/", auth, async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.user.id).select("-password");
  } catch (err) {
    const error = new HttpError("Could not fetch user.", 500);
    return next(error);
  }
  res.json(user);
});

/**
 *  @route   POST api/auth
 *  @desc    (login) Authenticate user and return token
 *  @params  Header: (key) Content-Type (value) application/json
 *           Body: {"email": "", "password": ""}
 *  @access  Public
 */
router.post(
  "/",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError("Invalid inputs passed", 422));
    }

    const { email, password } = req.body;

    /** User found in the db */
    let user;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      const error = new HttpError("Login Failed!", 500);
      return next(error);
    }

    if (!user) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        403
      );
      return next(error);
    }

    /** Password compared in the db */
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      const error = new HttpError("Login Failed!", 500);
      return next(error);
    }

    if (!isMatch) {
      const error = new HttpError("Invalid credentials.", 403);
      return next(error);
    }

    /** User data from db */
    const payload = {
      user: {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
    };

    /** Generated user token */
    let token;
    try {
      token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
    } catch (err) {
      const error = new HttpError("Login Failed!", 500);
      return next(error);
    }

    res.json({ token });
  }
);

module.exports = router;
