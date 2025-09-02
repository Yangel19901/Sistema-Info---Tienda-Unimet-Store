import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  linkWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

export async function getAllUsers() {
  const userCollection = collection(db, "User");
  const userDocs = await getDocs(userCollection);
  const user = userDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return user;
}

export async function getUser(id) {
  const userCollection = collection(db, "User");
  const userRef = doc(userCollection, id);
  const userDoc = await getDoc(userRef);
  const user = { id: userDoc.id, ...userDoc.data() };
  return user;
}

export async function createUser(data) {
  const userCollection = collection(db, "User");
  const userRef = doc(userCollection, data.email);
  await setDoc(userRef, data);
  const user = { id: data.email, data };
  return user;
}

export async function signUpUser(data) {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      
    })
    .catch((error) => {});
}

export async function emailAndCarnetValidateQuery(atribute, data) {
  const userCollection = collection(db, "User");

  let queryNotExist = true;
  let a = 0;

  const q = query(userCollection, where(atribute, "==", data));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    a++;
    //console.log(doc.id, " => ", doc.data());
  });
  if (a == 0) {
    queryNotExist = true;
    //console.log(querySnapshot);
  } else if (a > 0) {
    queryNotExist = false;
  }

  return queryNotExist;
}

export async function userSignedInAuth() {
  const user = auth.currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
}

export async function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
