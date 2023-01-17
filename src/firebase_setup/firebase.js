// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBtHEpMOK3OIW_M3tZrlSSUdAcUIhI5lJ8',
	authDomain: 'e-bussines-20ab2.firebaseapp.com',
	databaseURL: 'https://e-bussines-20ab2-default-rtdb.firebaseio.com',
	projectId: 'e-bussines-20ab2',
	storageBucket: 'e-bussines-20ab2.appspot.com',
	messagingSenderId: '377349288573',
	appId: '1:377349288573:web:211ec4f1b7888ef6cb3714',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)

export default db
