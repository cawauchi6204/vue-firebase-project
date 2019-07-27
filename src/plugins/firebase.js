import firebase from 'firebase'

const firebaseConfig = {
  apiKey: '<apiKey>',
  authDomain: '<authDomain>',
  databaseURL: '<databaseURL>',
  projectId: '<projectId>',
  storageBucket: '<storageBucket>',
  messagingSenderId: '<messagingSenderId> ',
  appId: '<appId>',
}
firebase.initializeApp(firebaseConfig)

export default firebase
