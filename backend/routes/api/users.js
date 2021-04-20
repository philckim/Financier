const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const config = require("config");
const User = require("../../models/User");
const HttpError = require("../../models/Http-Error");

/**
 *  @route   POST api/users
 *  @desc    Register new user
 *  @params  Headers: (key) Content-type (value) application/json
 *           Body: {"name": "", "email": "", "password": ""}
 *  @access  Public
 */
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errors found", errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    /** Check if user exists */
    let user;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      const error = new HttpError("Error fetching user.", 500);
      return next(error);
    }

    if (user) {
      const error = new HttpError("User already exists.", 422);
      return next(error);
    }

    /**  User gravatar */
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    /** Encrypted password */
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
    } catch (err) {
      const error = new HttpError("Sign Up Failed.", 500);
      return next(error);
    }

    /** JSON user object */
    const payload = {
      user: {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
    };

    /** Signed user token */
    let token;
    try {
      token = jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600 });
    } catch (err) {
      const error = new HttpError("Login Failed.", 500);
      return next(error);
    }
    res.json(token);
  }
);

module.exports = router;
