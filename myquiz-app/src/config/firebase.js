import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuePOkQlWOYOvDNxd2f75Llk2fhU5yXlQ",
  authDomain: "myquezzy-react.firebaseapp.com",
  projectId: "myquezzy-react",
  storageBucket: "myquezzy-react.appspot.com",
  messagingSenderId: "576088499661",
  appId: "1:576088499661:web:52666b9e409f13c1945084"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;