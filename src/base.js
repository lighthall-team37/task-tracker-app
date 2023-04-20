import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFg5GnxEKcfFpM02JxCcttzI99yQcZJYE",
    authDomain: "tasktrackerapp-3eec4.firebaseapp.com",
    projectId: "tasktrackerapp-3eec4",
    storageBucket: "tasktrackerapp-3eec4.appspot.com",
    messagingSenderId: "599562315998",
    appId: "1:599562315998:web:7d9c042daa9e07c6b2ba4f",
    measurementId: "G-CMBKP8KS1D"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const data = {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      taskList: []
    }
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    //   taskList: []
    // });
    await setDoc(doc(db, "users", user.uid), data)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};