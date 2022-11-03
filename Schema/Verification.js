const mongoose = require('mongoose');

/* Schema for Sign Up */
const SignUpschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

const Verification = mongoose.model('UserDetail', SignUpschema);

module.exports = Verification;