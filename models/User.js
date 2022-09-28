const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],

    },
    mobile: {
        type: String,
        required: [true, 'Minimum length 10'],
        minlength: [10, 'Minimum password length is 10'],
        unique: true,
    },
    role: {
        type: String
    },
    location: {
        type: Object
    }
});


// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;