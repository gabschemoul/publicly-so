import { initializeApp, getApp, getApps } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

/*const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Your web app's Firebase configuration
const firebaseLeadsConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_LEADS_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_LEADS_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_LEADS_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_LEADS_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_LEADS_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_LEADS_APP_ID,
};*/

let app;
let appLeads;

/*const app =
  getApps().length === 0
    ? initializeApp({ ...firebaseConfig, projectId: firebaseConfig?.projectId })
    : /*: initializeApp(
        { ...firebaseConfig, projectId: firebaseConfig?.projectId },
        "publiclyApp" + getApps().length + 1
      );*
      getApp();
const db = getFirestore(app);
const storage = getStorage();

export { app, db, storage };*/

/*console.log(getApps());*/

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

const storage = getStorage();

console.log("firebaseConfig");
console.log(firebaseConfig);
console.log("firebaseLeadsConfig");
console.log(firebaseLeadsConfig);
console.log("getApps()");
console.log(getApps());
console.log("db");
console.log(db);
console.log("dbLeads");
console.log(dbLeads);

export { app, db, appLeads, dbLeads, storage };
