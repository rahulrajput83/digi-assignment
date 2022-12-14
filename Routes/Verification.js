const express = require('express');
const router = express.Router();
const Verification = require('../Schema/Verification');
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

/* Route for Sign Up */
router.post('/signup', (req, res) => {
    Verification.find({ email: req.body.email })
        .then((result) => {
            if (result.length > 0) {
                res.json({ message: 'Already Registered' })
            }
            else {
                const NewUser = new Verification({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 1),
                    role: req.body.role
                })
                NewUser.save()
                    .then((data) => {
                        res.json({message: 'Registered', data: data})
                    })
                    .catch(() => {
                        res.json({message: 'Error'});
                    })
            }
        })
        .catch(() => {
            res.json({ message: 'Error' })
        })
})


/* Route for Sign In */
router.post('/signin', (req, res) => {
    Verification.find({ email: req.body.email })
        .then((result) => {
            if (result.length > 0) {
                const passwordValid = bcrypt.compareSync(req.body.password, result[0].password);
                if(!passwordValid) {
                    res.json({message: 'Invalid Password'})
                }
                else {
                    const token = jwt.sign({id: result[0]._id, email: result[0].email, role: result[0].role}, process.env.Key, {
                        expiresIn: 3600
                    });
                    res.json({
                        id: result[0]._id,
                        name: result[0].name,
                        accessToken: token,
                        email: result[0].email,
                        role: result[0].role
                    })
                }
            }
            else {
                res.json({message: 'User not registered..'})
            }
        })
        .catch(() => {
            res.json({ message: 'Error' })
        })
})

module.exports = router;