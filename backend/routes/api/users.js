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
    console.log('registering user...');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log('errors found', errors);
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });

        if(user) {
            throw new Error('user already exists');
            // res.status(400).json({ errors: [{ msg: 'User already exists' }] });
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
                userId: user.id,
                email: user.email,
                name: user.name,
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
        // throw new Error('message');
        res.send(err);
    }
}); 

module.exports = router;