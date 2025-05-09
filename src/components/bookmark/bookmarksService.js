import { db } from '../firebase/firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';

export const getBookmarks = async (userId) => {
  if (!userId) throw new Error('User ID is required');

  const q = query(collection(db, 'bookmarks'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addBookmark = async (userId, bookmarkData) => {
  if (!userId) throw new Error('User ID is required');

  const newBookmarkRef = doc(collection(db, 'bookmarks'));
  await setDoc(newBookmarkRef, {
    ...bookmarkData,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return { id: newBookmarkRef.id, ...bookmarkData };
};

export const updateBookmark = async (bookmarkId, updates) => {
  if (!bookmarkId) throw new Error('Bookmark ID is required');

  const bookmarkRef = doc(db, 'bookmarks', bookmarkId);
  await updateDoc(bookmarkRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

export const deleteBookmark = async (bookmarkId) => {
  if (!bookmarkId) throw new Error('Bookmark ID is required');

  const bookmarkRef = doc(db, 'bookmarks', bookmarkId);
  await deleteDoc(bookmarkRef);
};