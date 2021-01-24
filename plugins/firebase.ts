import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
// import 'firebase/analytics';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAKBCoMAXTPhipdNBxXOoxIc7RlBj_z-q4',
    authDomain: 'shoespicks-9b614.firebaseapp.com',
    databaseURL: 'https://shoespicks-9b614.firebaseio.com',
    projectId: 'shoespicks-9b614',
    storageBucket: 'shoespicks-9b614.appspot.com',
    messagingSenderId: '767094896500',
    appId: '1:767094896500:web:bcdf190333b172b2cede21',
    measurementId: 'G-95T257EXNB'
  });
  // firebase.analytics(); TODO analytics使い方わからん
}
export default firebase;
