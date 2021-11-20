const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const path = require('path')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')
const isAuthenticated = require('./middlewares/isAuthenticated')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cw-lite'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

// handling POST --> req.body
app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 15000,
  // 15 seconds
}))

// can only access req.session within a POST request
app.post('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`hello ${req.session.username}`)
  } else {
    res.send('please log in')
  }
})

// routers
app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// error handling default/middleware
app.use(isAuthenticated, (err, req, res, next) => {
  res.status(200).send('Error: user not authenticated')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
