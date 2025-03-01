  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
    import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  function showMessages(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
  }, 5000);
  }
  // sign Up

  const signUp = document.getElementById('signup-button');
  signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('name').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userData = { 
            name: name,
            email: email 
        }; // Store user data
        showMessages('Account created successfully', 'signup-message');
        const docRef = doc(db, 'users', user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'sign.html#signin-form';
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
            showMessages('Email already in use', 'signup-message');
        }
        else {
            showMessages('Error creating account', 'signup-message');
        }
      })
  });

  // sign in

  const signIn = document.getElementById('signin-button');
  signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessages('Signed in successfully', 'signin-message');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'index.html';
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessages('Invalid credentials', 'signin-message');
        }
        else {
            showMessages('Account does not exist', 'signin-message');
        }
      });
  });