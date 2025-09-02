import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,deleteDoc
} from "firebase/firestore";
import { db } from "../firebase";


export async function getAllMenu() {
  const menuCollection = collection(db, "Menu");
  const menuDocs = await getDocs(menuCollection);
  const menu = menuDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return menu;
}

export async function getMenu(id) {
  const menuCollection = collection(db, "Menu");
  const menuRef = doc(menuCollection, id);
  const menuDoc = await getDoc(menuRef);
  const menu = { id: menuDoc.id, ...menuDoc.data() };
  return menu;
}

export async function createMenu(data) {
  const menuCollection = collection(db, "Menu");
  const menuRef = doc(menuCollection, data.name + data.price);
  await setDoc(menuRef, data);
}

export async function changeAvaileble(data) {
  const menuCollection = collection(db, "Menu");
  const menuRef = doc(menuCollection, data.name + data.price);
  await setDoc(menuRef, data);
}


export async function menuValidation(data) {
  const userCollection = collection(db, "Menu");
  let queryNotExist = true;
  let a = 0;

  const q = query(userCollection, where("name", "==", data.name), where("price", "==", data.price), where("description", "==", data.description));
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


export async function deleteMenuFirebase(id){
  await deleteDoc(doc(db, "Menu", id));;
}
