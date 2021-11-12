const isAuthenticated = (req, res, next, err) => {
  console.log('authenticated')
  console.log(req.session.username)
  if (req.session.username && req.session.username !== '') {
    next()
  } else {
    next(err)
  }
}

module.exports = isAuthenticated
