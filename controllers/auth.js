const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../models/user');
const { registrationValidation, loginValidation } = require('../helpers/validationClient');
const mailHandler = require('../helpers/mailHandler');

exports.register = async (req, res) => {
 
    let user = new User();
    try {

        const { error } = registrationValidation(req.body);
        if(error){
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        let response = await User.findOne({ email: req.body.email });
        if (response) {
            return res.status(403).json({
                success: false,
                message: 'Email already exists'
            });
        }

        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        const verificationToken = crypto.randomBytes(15).toString('hex');
        user.verifyEmailToken = verificationToken;
        user.verifyEmailTokenExpiry = Date.now() + 360000;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'User registered successfully. An email has been sent to you.'
        });

        return mailHandler.confirmEmail(req.body.email, verificationToken);
        
        
    } catch (err) {

        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during registration, please try again later.'
        });
        
    }
};

exports.verifyEmail = async (req, res) => {
    try {

        let response = await User.findOne({
            verifyEmailToken: req.query.verification,
            email: req.query.email,
            verifyEmailTokenExpiry: { $gt: Date.now() }
        });
        if (response) {
            await User.findOneAndUpdate({ email: response.email }, { $set: { isVerified: true } });

            return res.json({
                success: true,
                message: 'Account verified successfully. You can now login.'
            });
        } else {
            return res.status(403).json({
                success: false,
                message: 'Invalid email or expired verification link'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred.'
        });
    }
};

exports.login = async (req, res, next) => {

    try {
        let response = await User.findOne({ email: req.body.email });
        if (response) {
            if (!response.isVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Your account is not verified."
                });
            }
            const pass = response.comparePassword(req.body.password);
            if (!pass) {
                return res.status(403).json({
                    success: false,
                    message: "Username and password don't match"
                });
            }
            const payload = { id: response.id, email: response.email };
            const token = jwt.sign(payload,
                process.env.SECRET_KEY,
                { expiresIn: 3600 }
            );
            return res.header('auth-token', token).json({
                success: true,
                token: token
            });

        } else {
            return res.status(401).json({
                success: false,
                message: 'This email doesnt exist'
            });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred authenticating the user.'
        });
    }
};

exports.current = async (req, res, next) => {
    try {
        if (req.user) {
            return res.json({
                id: req.user.id,
                email: req.user.email
            });

        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid authentication token.'
            });

        }


    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: 'An error occurred.'
        });
    }
};