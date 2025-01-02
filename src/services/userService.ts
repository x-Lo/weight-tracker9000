import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createUserProfile = async (uid: string, data: { username: string; goalWeight?: number; startingWeight?: number }) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, data);
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (uid: string) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No user profile found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
