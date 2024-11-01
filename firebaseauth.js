// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
 import{getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA90C9PB2hTqln7WwsZAMpA7POv0tF3YKg",
  authDomain: "emon-1021b.firebaseapp.com",
  projectId: "emon-1021b",
  storageBucket: "emon-1021b.firebasestorage.app",
  messagingSenderId: "730093111520",
  appId: "1:730093111520:web:c080892d98a7fec612a885"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 //const auth = getAuth(app);//chat

 function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display='block';
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
    messageDiv.style.opacity=0;
  },5000)
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{

  event.preventDefault();
  const email=document.getElementById('rEmail').value;
  const password=document.getElementById('rPassword').value;
  const firstName=document.getElementById('fName').value;
  const lastName=document.getElementById('lName').value;

  const auth=getAuth();
  const db=getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    const user= userCredential.user;
    const userData={
      email: email,
      firstName: firstName,
      lastName: lastName
    };

    showMessage('Account Created Succesfully', 'signUpMessage');
    const docRef=doc(db, "users", user.uid);
    setDoc(docRef,userData)
    .then(()=>{
      window.location.href='index.html';
    })
    .catch((error)=>{
      console.error("error writing document", error);

    });
  })
  .catch((error)=>{
    const errorCode=error.code;
    if(errorCode=='auth/email-already-in-use'){
      showMessage('Email Address Already Exists !!!', 'signUpMessage');
    }
    else{
      showMessage('unable to create User', 'signUpMessage');
    }
  })
 });

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })