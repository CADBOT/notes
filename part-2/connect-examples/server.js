var connect = require('connect')
var http = require('http')
var app = connect()

function logger(req, res, next) {
  console.log(req.url)
  console.log(req.method)
  next()
}

function hello(req, res) {
  console.log('in hello')
  res.setHeader('content-type', 'text/plan')
  res.end('hello')
}

app.use(logger)
   .use(hello)

http.createServer(app).listen(3000)
