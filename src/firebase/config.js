import { initializeApp, getApp, getApps } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Your web app's Firebase configuration
const firebaseLeadsConfig = {
  apiKey: process.env.FIREBASE_LEADS_API_KEY,
  authDomain: process.env.FIREBASE_LEADS_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_LEADS_PROJECT_ID,
  storageBucket: process.env.FIREBASE_LEADS_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_LEADS_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_LEADS_APP_ID,
};

let app;
let appLeads;

if (getApps().length === 0) {
  app = initializeApp({
    ...firebaseConfig,
    projectId: firebaseConfig?.projectId,
  });
  appLeads = initializeApp(
    {
      ...firebaseLeadsConfig,
      projectId: firebaseLeadsConfig?.projectId,
    },
    "leads"
  );
} else {
  if (!getApp("leads")) {
    appLeads = initializeApp(
      {
        ...firebaseLeadsConfig,
        projectId: firebaseLeadsConfig?.projectId,
      },
      "leads"
    );
    app = getApp("[DEFAULT]");
  }
  if (!getApp("[DEFAULT]")) {
    app = initializeApp({
      ...firebaseConfig,
      projectId: firebaseConfig?.projectId,
    });

    appLeads = getApp("leads");
  }
}

const db = getFirestore(app);
const dbLeads = getFirestore(appLeads);

export { app, db, appLeads, dbLeads };
