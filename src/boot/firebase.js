import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFtcSRfzkdgJ582g1ONJoHAEBHF7wCckQ",
  authDomain: "titossy-cleaning-services.firebaseapp.com",
  projectId: "titossy-cleaning-services",
  storageBucket: "titossy-cleaning-services.appspot.com",
  messagingSenderId: "282761914035",
  appId: "1:282761914035:web:f3f6e42af2da92ea64f2c6",
  measurementId: "G-QW9WBRDTYV",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const currentUser = auth.currentUser;
const storage = getStorage();

export { firebaseApp, auth, db, currentUser, storage };
