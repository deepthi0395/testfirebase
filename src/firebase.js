//import firebase from "firebase/app"
import firebase from 'firebase/compat/app';
import {getAuth , signInWithEmailAndPassword} from "firebase/auth"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY , 
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN , 
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.REACT_APP_FIREBASE_APP_ID 
})

//const authFirebaseService = getAuth()
export const authFirebaseService = getAuth()

//export {app , authFirebaseService}
export default app