var http = require('http')
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-type": "text/plain"})
  response.write('hello')
  response.end()
})
server.listen(3000)
