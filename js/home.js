 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
 import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
   import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

   const firebaseConfig = {
    apiKey: "AIzaSyAevsu8e5wFT_Cb9LP4WZDAYcBlnWQQKXw",
    authDomain: "kfin-3a7b7.firebaseapp.com",
    projectId: "kfin-3a7b7",
    storageBucket: "kfin-3a7b7.firebasestorage.app",
    messagingSenderId: "184149820845",
    appId: "1:184149820845:web:9026c8d746dc06393f8d24",
    measurementId: "G-B84FWK7KR8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics();
  const auth = getAuth();
  const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, 'users', loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('name').innerText = userData.name;
                document.getElementById('named').innerText = userData.name;
            }
            else {
                console.log('No matching document');
            }    
        })
        .catch((error) => {
            console.log('Error getting document:', error);
        });
    }else {
        console.log('No user logged in');
            }
    });         


    const signOutButton = document.getElementById('signout-button');

    signOutButton.addEventListener('click', (event) => {
        localStorage.removeItem('loggedInUserId');
        signOut(auth)
        .then(() => {
            window.location.href = 'Main.html';
        })
        .catch((error) => {
            console.log('Error signing out:', error);
        });
    });