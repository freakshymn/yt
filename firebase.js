// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuB1am-VpLKrx5y0fQnWly6I8do8hH3_g",
    authDomain: "website-database-7929c.firebaseapp.com",
    databaseURL: "https://website-database-7929c-default-rtdb.firebaseio.com",
    projectId: "website-database-7929c",
    storageBucket: "website-database-7929c.appspot.com",
    messagingSenderId: "126419504544",
    appId: "1:126419504544:web:13bd623eb28bff5fa5a8c5",
    measurementId: "G-8B717N622Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, child, push };
