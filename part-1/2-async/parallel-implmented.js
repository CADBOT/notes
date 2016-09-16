var request = require('request')

var tasks = [
  function() {
    getUser('CADBOT') 
  },
  function() {
    getUser('torvalds')
  }
]

var results = []

var tasksCompleted = 0

function checkForCompletion() {
  tasksCompleted++
  if (tasksCompleted == tasks.length) {
    console.log('Done!')
    console.log(results)
  }
}

function getUser(user) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: {
      'User-Agent': 'node.js'
    }
  }
  request.get(options, function(err, response, body) {
    if (err) throw err
    results.push(body)
    checkForCompletion()
  })

}

tasks.forEach(task => task())
