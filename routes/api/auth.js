const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth,  async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    //res.send('Auth route');
});

// @route   GET api/auth
// @desc    Authenticate User and get token 
// @access  Public
router.post('/', 
[
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password of 6 or more characters').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const {email, password } = await req.body;
    try {
        //See if user exists
        let user = await User.findOne({ email });
        const isMatch = user && await bcrypt.compare(password, user.password);

        if(!user || !isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        } 

        const payload = {
            user: {
                id: user.id
            }
        };

        //Return JWT
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
        //res.send('User registerd');
    } catch (err)  {
        console.error(err.message); 
        res.status(500).send('Server Error!');
    }
});

module.exports = router;
module.exports = router;