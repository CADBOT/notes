var connect = require('connect')
var http = require('http')
var app = connect()

var users = {
  cadbot: 'pass1234'
}

function logger(req, res, next) {
  next()
}

function authenticate(req, res, next) {
  var auth = req.headers.authorization
  if (!auth) return console.log('unauthorized')
  var parts = auth.split(' ')
  var auth = new Buffer(parts[1], 'base64').toString().split(':')
  var user = auth[0]
  var pass = auth[1]
  if (users[user] !== pass) {
    return console.log('invalid password')
  }
  res.user = user
  next()
}

function hello(req, res) {
  res.setHeader('content-type', 'text/plan')
  console.log('in hello')
  console.log(res.user)
  var message = 'hello ' + res.user
  console.log(message)
  res.end(message)
}

app.use(logger)
   .use(authenticate)
   .use(hello)

http.createServer(app).listen(3000)
