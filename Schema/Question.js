const mongoose = require('mongoose');

/* Schema for Quiz */
const Questionschema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    link: String,
    Question: Array,
});

const Question = mongoose.model('Questions', Questionschema);

module.exports = Question;