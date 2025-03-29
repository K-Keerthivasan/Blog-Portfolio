import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC9Q8-0_jWgLH-A8Gk6bmJo_emXBlCjqGM",
    authDomain: "kk-dev-portfolio.firebaseapp.com",
    projectId: "kk-blog-site",
    storageBucket: "kk-blog-site.firebasestorage.app",
    measurementId: "G-11YE2TYS8P"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
