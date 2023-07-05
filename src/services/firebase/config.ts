import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCfZcvMhvIEJw9fnP4xHzKIBXvyhRAKuiU",
  authDomain: "taskify-dev-99684.firebaseapp.com",
  projectId: "taskify-dev-99684",
  storageBucket: "taskify-dev-99684.appspot.com",
  messagingSenderId: "890345613145",
  appId: "1:890345613145:web:db8069dc52e5b8f8dbce48",
  measurementId: "G-L6BWB7SMPF"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)