import { db } from '../../components/firebase/firebase';
import {
    collection,
    doc,
    setDoc,
    getDoc, // Добавляем этот импорт
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp
} from 'firebase/firestore';

// Получение всех персонажей пользователя
export const getCharacters = async (userId) => {
    if (!userId) throw new Error('User ID is required');

    try {
        const q = query(collection(db, 'characters'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting characters:', error);
        throw error;
    }
};

// Получение конкретного персонажа по ID
export const getCharacterById = async (characterId) => {
    if (!characterId) throw new Error('Character ID is required');

    try {
        const characterRef = doc(db, 'characters', characterId);
        const characterSnap = await getDoc(characterRef);

        if (!characterSnap.exists()) {
            throw new Error('Character not found');
        }

        return {
            id: characterSnap.id,
            ...characterSnap.data()
        };
    } catch (error) {
        console.error('Error getting character:', error);
        throw error;
    }
};

// Создание нового персонажа
export const addCharacter = async (userId, characterData) => {
    if (!userId) throw new Error('User ID is required');

    try {
        const characterRef = doc(collection(db, 'characters'));
        const characterWithMeta = {
            ...characterData,
            userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        await setDoc(characterRef, characterWithMeta);

        return {
            id: characterRef.id,
            ...characterWithMeta
        };
    } catch (error) {
        console.error('Error adding character:', error);
        throw error;
    }
};

// Обновление персонажа
export const updateCharacter = async (characterId, updates) => {
    if (!characterId) throw new Error('Character ID is required');

    try {
        const characterRef = doc(db, 'characters', characterId);
        await updateDoc(characterRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating character:', error);
        throw error;
    }
};

// Удаление персонажа
export const deleteCharacter = async (characterId) => {
    if (!characterId) throw new Error('Character ID is required');

    try {
        const characterRef = doc(db, 'characters', characterId);
        await deleteDoc(characterRef);
    } catch (error) {
        console.error('Error deleting character:', error);
        throw error;
    }
};