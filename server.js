const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')

// const UserRouter = require('./routes/maybe_user')
const AccountRouter = require('./routes/account')
// const TransactionRouter = require('./routes/maybe_transaction')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cw-lite'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// handling POST --> req.body
app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 10000,
  // 5 seconds
}))

// can only access req.session within a POST request
app.post('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`hello ${req.session.username}`)
  } else {
    res.send('please log in')
  }
})

app.use('/account', AccountRouter)

app.listen(3000, () => {
  console.log('listening on port 3000')
})
