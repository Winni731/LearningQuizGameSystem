// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe5_V38YhgNmMHY2cg_Cv0aFIwaZN5Gd4",
  authDomain: "learninggameapp.firebaseapp.com",
  projectId: "learninggameapp",
  storageBucket: "learninggameapp.appspot.com",
  messagingSenderId: "873461856059",
  appId: "1:873461856059:web:ef01ce3197fbdc763aa91e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export function getNewQuizID() {
  const newQuizIDRef = doc(collection(db, "quizzes"));
  // setDoc(newQuizIDRef, {})
  return newQuizIDRef.id;
}

export const storage = getStorage(app);