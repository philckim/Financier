const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const config = require("config");
const fileUpload = require("../middleware/file-upload");
const HttpError = require("../models/Http-Error");
const User = require("../models/User");

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
      return next(new HttpError("Invalid inputs.", 422));
    }

    const { email, password } = req.body;

    /** User found in the db */
    let user;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      const error = new HttpError("Login Failed.", 500);
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
      const error = new HttpError("Login Failed.", 500);
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
      const error = new HttpError("Login Failed.", 500);
      return next(error);
    }

    res.json({ token });
  }
);

/**
 *  @route   POST api/users
 *  @desc    Register new user
 *  @params  Headers: (key) Content-type (value) application/json
 *           Body: {"name": "", "email": "", "password": ""}
 *  @access  Public
 */
router.post(
  "/create",
  fileUpload.single("image"),
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
      return next(new HttpError("Invalid inputs.", 422));
    }

    const { name, email, password } = req.body;

    /** Check if user exists */
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      const error = new HttpError("Error fetching user.", 500);
      return next(error);
    }

    if (existingUser) {
      const error = new HttpError("User already exists.", 422);
      return next(error);
    }

    const newUser = new User({
      name,
      email,
      image: req.file.path,
      password,
    });

    /** Encrypted password */
    try {
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await user.save();
    } catch (err) {
      const error = new HttpError("Sign Up Failed.", 500);
      return next(error);
    }

    /** JSON user object */
    const payload = {
      user: {
        userId: newUser.id,
        email: newUser.email,
        image: newUser.image,
        name: newUser.name,
      },
    };

    /** Generated user token */
    let token;
    try {
      token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
    } catch (err) {
      const error = new HttpError("Login Failed.", 500);
      return next(error);
    }

    res.json({ token });
  }
);

module.exports = router;
