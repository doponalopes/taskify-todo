import {
  collection,
  getFirestore,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { app } from "../config";

import { UsersStatusType } from "types/authTypes";

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
    throw error;
  }
}

export async function changeUserOnline(id: string, online: boolean) {
  const db = getFirestore(app);

  try {
    const docRef = doc(db, 'users', id);

    await updateDoc(docRef, { online });
  } catch (error) {
    throw error;
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
    throw error;
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
      throw error;
    }
  }
}
