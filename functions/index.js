// const functions = require('firebase-functions')
import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()
const storage = admin.storage()

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

export const funcGetTaskLists = functions.https.onCall(async (data, context) => {
  const response = {
    status: null,
    error: null,
    items: [],
  }
  await db
    .collection('task')
    .get()
    .then(snapshot => {
      response.status = true
      snapshot.forEach(doc => {
        response.items.push(Object.assign({ id: doc.id }, doc.data()))
      })
    })
    .catch(error => {
      response.status = false
      response.error = error
    })
  return response
})

export const funcGetTask = functions.https.onCall(async (data, context) => {
  const response = {
    status: null,
    error: null,
  }
  await db
    .collection('task')
    .doc(data.id)
    .get()
    .then(doc => {
      if (doc.exists) {
        const taskData = doc.data()
        response.status = true
        response.name = taskData.name
        response.description = taskData.description
        response.done = taskData.done
        response.createdAt = taskData.createdAt
      } else {
        response.status = false
      }
    })
    .catch(error => {
      response.status = false
      response.error = error
    })
  return response
})

export const funcAddTask = functions.https.onCall(async (data, context) => {
  const response = {}
  const task = data.task
  task.createdAt = new Date()
  await db
    .collection('task')
    .add(task)
    .then(res => {
      response.status = true
      response.id = res.id
    })
    .catch(error => {
      response.status = false
      response.error = error
    })
  return response
})

export const funcUpdateTask = functions.https.onCall(async (data, context) => {
  const response = {}
  const id = data.id
  const task = data.task
  task.createdAt = new Date()
  await db
    .collection('task')
    .doc(id)
    .set(task)
    .then(() => {
      response.status = true
    })
    .catch(error => {
      response.status = false
      response.error = error
    })
  return response
})

export const funcDeleteTask = functions.https.onCall(async (data, context) => {
  const response = {}
  const id = data.id
  await db
    .collection('task')
    .doc(id)
    .delete()
    .then(() => {
      response.status = true
    })
    .catch(error => {
      response.status = false
      response.error = error
    })
  return response
})

export const setMetaData = functions.storage.object().onFinalize((object, context) => {
  const ref = storage.bucket().file(object.name)
  const metaData = {
    cacheControl: 'max-age=300',
  }
  ref
    .setMetadata(metaData)
    .then(res => {
      console.info(res)
    })
    .catch(error => {
      console.error(error)
    })

  db.collection('storage_func')
    .add({
      bucket: object.bucket,
      contentType: object.contentType,
      id: object.id,
      md5Hash: object.md5Hash,
      mediaLink: object.mediaLink,
      name: object.name,
      selfLink: object.selfLink,
      size: object.size,
      storageClass: object.storageClass,
      timeCreated: object.timeCreated,
      downloadUrl: `https://firebasestorage.googleapis.com/v0/b/${object.bucket}/o/${encodeURIComponent(
        object.name
      )}?alt=media`,
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
})
