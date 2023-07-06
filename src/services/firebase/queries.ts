import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";

import { app } from "./config";

export async function fetchAllTask(callback) {
  const db = getFirestore(app);
  const tasksCol = collection(db, "tasks");

  try {
    const unsubscribe = onSnapshot(tasksCol, async (snapshot) => {
      const allTasks = [];

      snapshot.forEach((doc) => {
        allTasks.push({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          blocked: doc.data().blocked,
          completed: doc.data().completed,
          createdAt: doc.data().createdAt.seconds,
          deliveryDate: doc.data().deliveryDate.seconds,
          ownerUid: doc.data().ownerUid,
          ownerName: doc.data().ownerName,
        });
      });

      callback(allTasks);
    });

    return unsubscribe;

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

export async function updateTask(id, data) {
  const db = getFirestore(app);

  try {
    const docRef = doc(db, 'tasks', id);

    await updateDoc(docRef, {
      ...data
    });
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
  }
}

export async function changeTaskStatus(id, completed) {
  const db = getFirestore(app);

  try {
    const docRef = doc(db, 'tasks', id);

    await updateDoc(docRef, {
      completed
    });
  } catch (error) {
    console.error('Erro ao atualizar o status do documento:', error);
  }
}

export async function removeTask(id) {
  const db = getFirestore(app);

  try {
    const docRef = doc(db, 'tasks', id);

    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erro ao remover o documento:', error);
  }
}