import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyC0WNvVIrXcqprzTC2WGWSn6Pi5ayXDF0U",
  authDomain: "vanlife-3fcae.firebaseapp.com",
  projectId: "vanlife-3fcae",
  storageBucket: "vanlife-3fcae.firebasestorage.app",
  messagingSenderId: "765325323966",
  appId: "1:765325323966:web:ad87f38bf5f242abe6b8ef"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")





export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
   const vans =  snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        throw new Error("Van not found")
    }

    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}


export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}