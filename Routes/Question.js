const express = require('express');
const router = express.Router();
const Question = require('../Schema/Question');
const jwt = require('jsonwebtoken')


/* Route to add Quiz */
router.post('/add', (req, res) => {
    if (!req.headers.authorization) {
        res.json({ message: 'Token not provided' })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        res.json({ message: 'Token not provided' });
    }
    else {
        jwt.verify(token, process.env.Key, (err, decoded) => {
            if (err) {
                res.json({ message: 'Unauthorized' })
            }
            else {
                const newQuestion = new Question({
                    userId: req.body.userId,
                    name: req.body.name,
                    email: req.body.email,
                    link: req.body.link,
                    Question: req.body.data
                })
                newQuestion.save()
                    .then((data) => {
                        res.json({ message: 'Added', question: data })
                    })
                    .catch((err) => {
                        res.json({ message: 'Error' })
                    })
            }
        })
    }

})


/* Route to get Quiz Question */
router.post('/getQuestions', (req, res) => {
    if (!req.headers.authorization) {
        res.json({ message: 'Token not provided' })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        res.json({ message: 'Token not provided' });
    }
    else {
        jwt.verify(token, process.env.Key, (err, decoded) => {
            if (err) {
                res.json({ message: 'Unauthorized' })
            }
            else {
                Question.findOne({link: req.body.link})
                    .then((data) => {
                        res.json({message: 'Success', data: data})
                    })
                    .catch(() => {
                        res.json({message: 'Error'})
                    })
            }
        })
    }
})


module.exports = router;