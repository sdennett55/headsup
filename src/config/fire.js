import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDMJ-2TjawLbkjbXVl0844mEpmcM5-SDII",
  authDomain: "wait-up-5ad7e.firebaseapp.com",
  databaseURL: "https://wait-up-5ad7e.firebaseio.com",
  projectId: "wait-up-5ad7e",
  storageBucket: "wait-up-5ad7e.appspot.com",
  messagingSenderId: "603672906124",
  appId: "1:603672906124:web:2fcf7a00792f8644"
};
const fire = firebase.initializeApp(config);
export default fire;