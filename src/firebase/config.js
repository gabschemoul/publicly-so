import { initializeApp, getApp, getApps } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADm8WkBXG0258zXOfM3lVFdtL__JM97po",
  authDomain: "publicly-app.firebaseapp.com",
  projectId: "publicly-app",
  storageBucket: "publicly-app.appspot.com",
  messagingSenderId: "139920072271",
  appId: "1:139920072271:web:dc29de077e2c7e9c7a543a",
  measurementId: "G-8Z4LDT58XT",
};

// Your web app's Firebase configuration
const firebaseLeadsConfig = {
  apiKey: "AIzaSyBnL75mGrXv_FR1MZVFkdmOeP5isTn1tE0",
  authDomain: "publicly-leads.firebaseapp.com",
  projectId: "publicly-leads",
  storageBucket: "publicly-leads.appspot.com",
  messagingSenderId: "678315838423",
  appId: "1:678315838423:web:3a8b1098db789d20ca9992",
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

console.log(db);
console.log(dbLeads);

/*
const app =
  getApps().length === 0
    ? initializeApp({ ...firebaseConfig, projectId: firebaseConfig?.projectId })
    : getApp();
const db = getFirestore(app);


const appLeads =
  getApps().length === 0
    ? initializeApp({
        ...firebaseLeadsConfig,
        projectId: firebaseLeadsConfig?.projectId,
      })
    : getApp();
const dbLeads = getFirestore(appLeads);
*/
/*
const app = initializeApp({
  ...firebaseConfig,
  projectId: firebaseConfig?.projectId,
});
const db = getFirestore(app);
const appLeads = initializeApp({
  ...firebaseLeadsConfig,
  projectId: firebaseLeadsConfig?.projectId,
});
const dbLeads = getFirestore(appLeads);
*/

/*
console.log(getApps.find((item) => item.name_ === firebaseConfig?.projectId));
console.log(
  getApps.find((item) => item.name_ === firebaseLeadsConfig?.projectId)
);*/

export { app, db, appLeads, dbLeads };
