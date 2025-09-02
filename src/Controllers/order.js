import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";


export async function getAllOrder() {
  const orderCollection = collection(db, "Orders");
  const orderDocs = await getDocs(orderCollection);
  const order = orderDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return order;
}

export async function getCompleteOrders(complete, bool) {
  const orderCollection = collection(db, "Orders");
  const q = query(orderCollection, where(complete, "==", bool));
  const querySnapshot = await getDocs(q);
  const order = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return order;
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


export async function getOrder(id) {
  const orderCollection = collection(db, "Orders");
  const orderRef = doc(orderCollection, id);
  const orderDoc = await getDoc(orderRef);
  const order = { id: orderDoc.id, ...menuDoc.data() };
  return order;
}

export async function createOrder(data) {
  const orderCollection = collection(db, "Orders");
  const orderRef = doc(orderCollection, data.orderNumber);
  await setDoc(orderRef, data);
}
