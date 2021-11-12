const express = require('express')

const router = express.Router()

const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

// HOW TO MAKE isAuthenticated work??? ********************************

// add questions
// include next here and use next to throw error? Or in this one jsut res.send? ****************
router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  const { questionText, author } = req.body

  try {
    await Question.create({ questionText, author })
    res.send('question created')
  } catch (err) {
    next(err)
    res.send('question creation has problems')
  }
})

// add answer to question
// include next here and use next to throw error? Or in this one jsut res.send? ****************
router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body

  try {
    await Question.updateOne({ _id }, { answer })
    res.send('question answer updated')
  } catch (err) {
    next(err)
    res.send('answer question causes problems')
  }
})

// get all questions
// include next here and use next to throw error? Or in this one jsut res.send? ****************
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find({})
    res.json(questions)
  } catch (err) {
    res.send('getting questions has problems')
  }
})

module.exports = router
