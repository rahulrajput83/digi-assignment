require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Verification = require('./Routes/Verification');
const Question = require('./Routes/Question');
const app = express();

app.use(express.json({ limit: '1mb' }))

const port = process.env.PORT || 2500;

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})

app.use(express.urlencoded({ extended: true }));

/* Connect to MongoDB */
mongoose.connect(process.env.connectionString)
    .then(() => {
        console.log('Connected')
    })
    .catch(() => {
        console.log('Failed to connect')
    })


app.get('/', (req, res) => {
    res.json({ message: 'Welcome' })
})

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

app.use('/', Verification);
app.use('/', Question)