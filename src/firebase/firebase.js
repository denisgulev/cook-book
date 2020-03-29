// connection to the db
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
/* const authProvider = new firebase.auth.signInWithEmailAndPassword(
  email,
  password
).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log('errorCode', errorCode);
  console.log('errorMessage', errorMessage);

  // ...
}); */
const storage = firebase.storage();
const storageRef = storage.ref();

export { firebase, /*  authProvider, */ storageRef, db as default };

/* // child_removed
db.ref("recipes").on("child_removed", snapshot => {
  console.log(snapshot.key, snapshot.val());
});

// child_changed
db.ref("recipes").on("child_changed", snapshot => {
  console.log(snapshot.val());
}); */

// read data
/* db.ref("recipes").on("value", snapshot => {
  const recipes = [];
  snapshot.forEach(child => {
    recipes.push({
      id: child.key,
      ...child.val()
    });
  });

  console.log(recipes);
}); */

/* db.ref("recipes").push({
  title: "Prima ricetta",
  ingredients: {
    salt: 300,
    sugar: 200,
    oil: 50
  },
  description: "How to do",
  createdAt: 5793038654738
}); */

/* db.ref("recipes/-Lw2xfgt-UrdHxvutRnc").update({
  description: "Done"
}); */

/* db.ref("recipes").push({
  title: "Prima ricetta",
  description: "How to do"
}); */

// read data and listen for changes
/* db.ref().on(
  "value",
  snapshot => {
    const val = snapshot.val();
    console.log(val);
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  },
  e => {
    console.log("Error occurred!", e);
  }
);

setTimeout(() => {
  db.ref("name").set("Pericle");
}, 5000); */

// read data just once
/* db.ref("location")
  .once("value")
  .then(snapshot => {
    console.log("Got data", snapshot.val());
  })
  .catch(e => {
    console.log("Error!", e);
  }); */

/* db.ref()
  .set({
    name: "Dman",
    age: 26,
    stressLevel: 7,
    job: {
      title: "Developer",
      company: "a2a"
    },
    location: {
      city: "Milan",
      country: "Italy"
    }
  })
  .then(() => {
    console.log("Data is saved!!!");
  })
  .catch(error => {
    console.log("This failed", error);
  });

db.ref().update({
  stressLevel: 9,
  "job/company": "Amazon",
  location: {
    city: "Seattle",
    country: "USA"
  }
}); */
