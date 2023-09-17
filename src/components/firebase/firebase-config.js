import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfUvBH5_NgSEvNvWTuMZM6jrRp_2lgKG0",
    authDomain: "kickervideo-bce82.firebaseapp.com",
    projectId: "kickervideo-bce82",
    storageBucket: "kickervideo-bce82.appspot.com",
    messagingSenderId: "854842027681",
    appId: "1:854842027681:web:af69e1029088b590694ae0"
  };

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };
