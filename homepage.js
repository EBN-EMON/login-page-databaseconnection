import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
 import{getAuth,onAuthStateChanged, signout} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })