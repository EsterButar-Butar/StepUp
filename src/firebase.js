import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDs3_Pco171y7k_bSdL0mUtBR7fOxb9LlY",

    authDomain:
        "stepup-14c00.firebaseapp.com",

    projectId: "stepup-14c00",

    storageBucket:
        "stepup-14c00.firebasestorage.app",

    messagingSenderId:
        "898954740867",

    appId:
        "1:898954740867:web:995bcd1a4410c4f51d87b6",

    measurementId: "G-GPRT5GHV6L",
};

const app = initializeApp(
    firebaseConfig
);

export const auth = getAuth(app);