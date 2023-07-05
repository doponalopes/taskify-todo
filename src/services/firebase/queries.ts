import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { app } from "./config";

export async function fetchAllTask() {
  const db = getFirestore(app);
  const tasksCol = collection(db, "tasks");

  try {
    const response = await getDocs(tasksCol);

    const allTask = response.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      text: doc.data().text,
      blocked: doc.data().blocked,
      completed: doc.data().completed,
      createdAt: doc.data().createdAt.seconds,
      deliveryDate: doc.data().deliveryDate.seconds,
      ownerUid: doc.data().ownerUid,
      onwerName: doc.data().onwerName,
    }));

    return allTask;
  } catch (error) {
    console.error("Erro ao obter dados da coleção:", error);
    throw error;
  }
}

export async function createTask(data) {
  const db = getFirestore(app);
  const tasksCol = collection(db, "tasks");

  try {
    await addDoc(tasksCol, {
      ...data,
      createdAt: serverTimestamp(),
      completed: false,
    });
  } catch (error) {
    console.error('Erro ao registrar documento:', error);
  }
}