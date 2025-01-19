import { firestore } from '@/lib/firebase'
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

export const doesCollectionExist = async (collectionName: string): Promise<boolean> => {
  try {
    const snapshot = await getDocs(collection(firestore, collectionName))
    return !snapshot.empty
  } catch {
    return false
  }
}

export const retriveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firestore, collectionName))
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return data
}

export const checkIfDataExixts = async (collectionName: string, field: string, value: string) => {
  const querySnapshot = await getDocs(
    query(collection(firestore, collectionName), where(field, '==', value))
  )
  if (!querySnapshot.empty) {
    return true
  } else {
    return false
  }
}

export const createData = async (collectionName: string, data: any) => {
  try {
    const collectionExists = await doesCollectionExist(collectionName)
    if (!collectionExists) return false
    await addDoc(collection(firestore, collectionName), data)
    return true
  } catch (error) {
    console.error('Failed to add project to database:', error)
    return false
  }
}

export const updateData = async (collectionName: string, id: string, data: any) => {
  try {
    const collectionExists = await doesCollectionExist(collectionName)
    if (!collectionExists) return false
    await updateDoc(doc(firestore, collectionName, id), data)
    return true
  } catch (error) {
    console.error('Failed to add project to database:', error)
    return false
  }
}

export const deleteData = async (collectionName: string, id: string) => {
  try {
    const collectionExists = await doesCollectionExist(collectionName)
    if (!collectionExists) return false
    const docRef = doc(firestore, collectionName, id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Failed to add project to database:', error)
    return false
  }
}

export const retriveDataById = async (collectionName: string, id: string) => {
  const snapshot = await getDoc(doc(firestore, collectionName, id))
  const data = snapshot.data()
  return data
}

export const convertFirestoreData = (data: any) => ({
  ...data,
  createdAt:
    data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
  updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt
})
