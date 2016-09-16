var request = require('request')
var user = 'CADBOT'

function getUser() {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: {
      'User-Agent': 'node.js'
    }
  }
  request.get(options, function(err, response, body) {
    if (err) return next(err)
    next(null, JSON.parse(body).repos_url) 
  })

}

function getRepos(repos_url) {
  var options = {
    url: repos_url,
    headers: {
      'User-Agent': 'node.js'
    }
  }
  request.get(options, function(err, response, body) {
    console.log(body)
  })
}

let tasks = [getUser, getRepos]
function next(err, result) {
  console.log(result)
  if (err) throw err

  var currentTask = tasks.shift()
  if (currentTask) {
    currentTask(result)
  }
}

next()
