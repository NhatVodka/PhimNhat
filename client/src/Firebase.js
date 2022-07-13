import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDExXLNDOWbGbOSq0-Qun1yv2uxFTpBwi8",
  authDomain: "phimnhat-53292.firebaseapp.com",
  projectId: "phimnhat-53292",
  storageBucket: "phimnhat-53292.appspot.com",
  messagingSenderId: "932343257776",
  appId: "1:932343257776:web:ce08fa33d9fced1b7df975",
  measurementId: "G-C301XP5Y65",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export const auth = getAuth(firebaseApp);

export default storage;
