// const functions = require('firebase-functions')
import * as functions from 'firebase-functions'

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!')
// })

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase ES2015!')
})
