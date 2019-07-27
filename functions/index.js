// const functions = require('firebase-functions')
import * as functions from 'firebase-functions'

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!')
// })

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase ES2015!')
})

export const funcLoginAuthentication = functions.https.onCall((data, context) => {
  const user = context.auth.token
  const isLogin = user.email.indexOf('@xxxxx.com') !== -1
  return {
    isLogin: isLogin,
    uid: user.uid,
    name: user.name,
    email: user.email,
    picture: user.picture,
  }
})
