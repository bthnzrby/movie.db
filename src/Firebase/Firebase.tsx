// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA7XjJTBSgN4zRgyKfpf-1DNRooaMXPLs",
  authDomain: "movie-eefc6.firebaseapp.com",
  projectId: "movie-eefc6",
  storageBucket: "movie-eefc6.appspot.com",
  messagingSenderId: "266194335398",
  appId: "1:266194335398:web:cb71a8a9984e4e6b406667",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const colRef = collection(db, "favories");

export const register = async (email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};
export const login = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};
export const logOut = async () => {
  await signOut(auth);
  return true;
};

export const addFavories = (movie: any, userId: string) => {
  addDoc(colRef, { movie, userId });
};

export const getFavories = async (id: string) => {
  let favories: any[] = [];

  const snapshot = await getDocs(colRef);

  snapshot.docs.forEach((doc) => {
    if (doc.data().userId === id) favories.push({ ...doc.data().movie });
  });

  return favories;
};
export default app;
