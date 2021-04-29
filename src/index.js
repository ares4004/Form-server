const express = require('express')
const port = 4000

const app = express()
app.locals = {}

app.use(express.json())

/*
const addTwoNumbers = (a, b) => a + b
const subTwoNumbers = (a, b) => a - b
const multiplyTwoNumbers = (a, b = 3) => a * b

const runAllFunctionsPassedInOrder = (...functions) => {
  const x = 1,
    y = 2

  functions.forEach((func) => {
    console.log('What was passed to us: ', func)
    console.log('Result of operation: ', func(x, y))
  })
}

runAllFunctionsPassedInOrder(addTwoNumbers, multiplyTwoNumbers, subTwoNumbers)
*/

const thisIsWhatWillHappen = {
  onEachRequest: (request, response, next) => {
    console.log('A new request received.')
    next()
  },
  serverIsUp: () => console.log('Server is up on http://localhost:4000'),
  onGetRequest: (request, response, next) => {
    console.log('A new GET request received.')
    next()
  },
  onPostRequest: (request, response, next) => {
    console.log('A new POST request received.')
    next()
  },
  onPutRequest: (request, response, next) => {
    console.log('A new PUT request received.')
    next()
  },
  onDeleteRequest: (request, response, next) => {
    console.log('A new DELETE request received.')
    next()
  },
  onAllRequestsOnAbhijeetPath: (request, response, next) => {
    console.log('A new request received on /abhijeet.')
    next()
  },
  onGetRequestsOnAbhijeetPath: (request, response, next) => {
    console.log('A new GET request received on /abhijeet.')
    next()
  },
  defaultResponseGenerator: (request, response, next) => {
    console.log('Nobody handled this one. Sending 404 instead.')
    response.sendStatus(404)
  },
  onLoginRequest: (request, response, next) => {
    const { email, password } = request.body
    app.locals.email = email
    app.locals.password = password
    response.json({ email, password })
  },
  onGetUser: (request, response, error) => {
    response.json({ email: app.locals.email })
  },
}

// default url: http://localhost:4000

// This will run on all requests
// URL: anything

app.use(thisIsWhatWillHappen.onEachRequest)

// This will run on all requests matching HTTP method
app.get('/', thisIsWhatWillHappen.onGetRequest)
app.put('/', thisIsWhatWillHappen.onPutRequest)
app.post('/', thisIsWhatWillHappen.onPostRequest)
app.delete('/', thisIsWhatWillHappen.onDeleteRequest)

// This will run on all requests http://localhost:4000/abhijeet
app.use('/abhijeet', thisIsWhatWillHappen.onAllRequestsOnAbhijeetPath)

// This will run on all GET requests http://localhost:4000/abhijeet
app.get('/abhijeet', thisIsWhatWillHappen.onGetRequestsOnAbhijeetPath)
app.post('/login', thisIsWhatWillHappen.onLoginRequest)
app.get('/user-details', thisIsWhatWillHappen.onGetUser)
// This will run on all requests, and send a status code 404 if not yet sent
app.use(thisIsWhatWillHappen.defaultResponseGenerator)

app.listen(port, thisIsWhatWillHappen.serverIsUp)
