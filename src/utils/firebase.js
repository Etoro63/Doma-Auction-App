import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx89mhPNRmKbUNHdu60W6LNbhr1IZTEd8",
  authDomain: "pulsepay-5c7fe.firebaseapp.com",
  projectId: "pulsepay-5c7fe",
  storageBucket: "pulsepay-5c7fe.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//👉 Go to Firebase Console, create a project, enable Email/Password Auth, and copy your config.