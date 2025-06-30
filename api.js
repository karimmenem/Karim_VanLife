import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC0WNvVIrXcqprzTC2WGWSn6Pi5ayXDF0U",
  authDomain: "vanlife-3fcae.firebaseapp.com",
  projectId: "vanlife-3fcae",
  storageBucket: "vanlife-3fcae.firebasestorage.app",
  messagingSenderId: "765325323966",
  appId: "1:765325323966:web:ad87f38bf5f242abe6b8ef"
};
const app = initializeApp(firebaseConfig);









export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
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