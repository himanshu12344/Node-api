const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that User is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'himanshu', {
        expiresIn: maxAge
    });
};


module.exports.signup_post = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ status: true, data: { user: user._id, token } });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    try {
        let id = req.body.id;
        if (!id) {
            res.status(410).json({ status: false, data: {} });
        }
        let user = await User.findById(id);
        res.status(200).json({ status: true, data: { user } });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ status: false, errors });
    }
}

module.exports.fetchUsers = async (req, res) => {
    try {
        let user = await User.find({});
        res.status(200).json({ status: true, data: { user } });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ status: false, errors });
    } 
}