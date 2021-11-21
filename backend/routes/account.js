const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')

const User = require('../models/user')

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.send('fetch all users has problems')
  }
})

// is logged in? middleware to check
router.post('/isLoggedIn', isAuthenticated, (req, res) => {
  const { username, password } = req.session
  res.send(username)
})

// create user
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    res.send('user created')
  } catch (err) {
    next(err)
  }
})

// login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send('user does not exist')
    } else {
      const { password: passDB } = user

      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    next(err)
    // res.send('user creation has problems')
  }
})

// logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

module.exports = router
