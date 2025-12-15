import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw1faxFMNzWIknV9sJBop2F_WkfTlWi1s",
  authDomain: "sceneforge360.firebaseapp.com",
  projectId: "sceneforge360",
  storageBucket: "sceneforge360.firebasestorage.app",
  messagingSenderId: "421730612506",
  appId: "1:421730612506:web:ddbc341f64bcf20029a8a3",
  measurementId: "G-PSF19CT2Q5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;


     