const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @params  Headers: (key) Content-type (value) application/json
//          Body: {"name": "", "email": "", "password": ""}
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be atleast 6 characters').isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servr Error (user.js)');
    }
});

module.exports = router;
