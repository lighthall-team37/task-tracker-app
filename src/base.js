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
  apiKey: "AIzaSyAFaYhPFFhK4NF08Ez54GJetp5-NiITAkU",
  authDomain: "tasktrackerapp-80d40.firebaseapp.com",
  projectId: "tasktrackerapp-80d40",
  storageBucket: "tasktrackerapp-80d40.appspot.com",
  messagingSenderId: "899089748696",
  appId: "1:899089748696:web:44cd508a058a9b44487dad",
  measurementId: "G-DXP0P3QVD7"
};


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