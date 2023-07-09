import {
  collection,
  getFirestore,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { RegisterUpdateTaskTypes, TaskProps } from "types/taskTypes";

import { app } from "./config";

import { convertTimestampToDate } from "@utils/dataUtils";
import { UsersStatusType } from "types/authTypes";

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

export async function searchUsersOnlineAndOffline(callback: (users: UsersStatusType[]) => void) {
  const db = getFirestore(app);
  const usersCol = collection(db, "users");

  try {
    const unsubscribe = onSnapshot(usersCol, async (snapshot) => {
      const allUsers: UsersStatusType[] = [];

      snapshot.forEach((doc) => {
        allUsers.push({
          id: doc.id,
          userId: doc.data().userId,
          username: doc.data().username,
          online: doc.data().online,
        });
      });

      callback(allUsers);
    });

    return unsubscribe;

  } catch (error) {
    console.error("Erro ao obter dados da coleção:", error);
    throw error;
  }
}

export async function changeUserOnline(id: string, online: boolean) {
  const db = getFirestore(app);

  console.log({
    id,
    online
  })

  try {
    const docRef = doc(db, 'users', id);

    await updateDoc(docRef, { online });
  } catch (error) {
    console.error('Erro ao atualizar o status do documento:', error);
  }
}

async function checkRegisteredUser(userId: string) {
  const db = getFirestore(app);
  const usersCol = collection(db, "users");

  try {
    const q = query(usersCol, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("Ocorreu um erro ao verificar o ID:", error);
    return false;
  }
}

export async function registerUserAccess(data: UsersStatusType) {
  const db = getFirestore(app);
  const usersCol = collection(db, "users");
  const registeredUser = await checkRegisteredUser(data.userId)

  if (!registeredUser) {
    try {
      await addDoc(usersCol, {
        ...data,
      });
    } catch (error) {
      console.error('Erro ao registrar documento:', error);
    }
  }
}
