import {
  collection,
  getFirestore,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";

import { RegisterUpdateTaskTypes, TaskProps } from "types/taskTypes";

import { app } from "./config";

import { convertTimestampToDate } from "@utils/dataUtils";

export async function fetchAllTask(callback: (tasks: TaskProps[]) => void) {
  const db = getFirestore(app);
  const tasksCol = collection(db, "tasks");

  try {
    const unsubscribe = onSnapshot(tasksCol, async (snapshot) => {
      const allTasks: TaskProps[] = [];

      snapshot.forEach((doc) => {
        allTasks.push({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          blocked: doc.data().blocked,
          completed: doc.data().completed,
          createdAt: convertTimestampToDate(doc.data().createdAt.toDate().toDateString()),
          deliveryDate: convertTimestampToDate(doc.data().deliveryDate.toDate().toDateString()),
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

export async function createTask(data: RegisterUpdateTaskTypes) {
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

export async function updateTask(id: string, data: RegisterUpdateTaskTypes) {
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

export async function changeTaskStatus(id: string, completed: boolean) {
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

export async function removeTask(id: string) {
  const db = getFirestore(app);

  try {
    const docRef = doc(db, 'tasks', id);

    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erro ao remover o documento:', error);
  }
}