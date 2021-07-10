import firebase from 'firebase'
import 'firebase/auth'

//Configure firebase here
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

//Initialize firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//Initialize firestore and storage
const db = firebaseApp.firestore();
const storage = firebase.storage()

//Setup authentication providers
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export {auth, storage, googleProvider, githubProvider, twitterProvider}
export default db;

