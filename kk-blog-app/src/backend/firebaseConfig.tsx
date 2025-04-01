import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC9Q8-0_jWgLH-A8Gk6bmJo_emXBlCjqGM",
    authDomain: "kk-blog-site.firebaseapp.com",
    projectId: "kk-blog-site",
    storageBucket: "kk-blog-site.firebasestorage.app",
    messagingSenderId: "829803350858",
    appId: "1:829803350858:web:e6cf8763ee8b457df68fb3",
    measurementId: "G-P05WPWSPE1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
