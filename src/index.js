import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

import {
    getAuth, createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCL7Nds1VwhyzwPxETlQle2rDB-6Rz_awI",
    authDomain: "fir-9-intro-617b2.firebaseapp.com",
    projectId: "fir-9-intro-617b2",
    storageBucket: "fir-9-intro-617b2.appspot.com",
    messagingSenderId: "315580407129",
    appId: "1:315580407129:web:667e21f92d57219e95c048"
  };

  //init firebase app
  initializeApp(firebaseConfig)

  //init firestore service
  const db = getFirestore()

  //initialize auth service
  const auth = getAuth()

  //collection ref - get a specific sollection
  const colRef = collection(db, 'books')

  //queries
//   const q = query(colRef, where("author", "==", "Sun zu"), orderBy('title', 'desc'))
const q = query(colRef,  orderBy('createdAt'))

//note: each time we add anew doc, firefase sends two data to our console, this is because the timestamp isnt included in the first data because it was still been processed

//retrieve collection data
//   getDocs(colRef)
//     .then((snapshot) => {
//         let books = []
//         snapshot.docs.forEach((doc) =>{
//             books.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(books)
//     })

//     .catch(err => {
//         console.log(err.message);
//     })

//real time collection
// onSnapshot(colRef, (snapshot) => {
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) =>{
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})


// add documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookForm.reset()
    })
})

// delete documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset()
    })
})

//get single data
const dataRef = doc(db, 'books', 'mtHDbDp7mu6tMtUTFLkr')
// getDoc(dataRef)
//     .then((doc) => {
//         console.log(doc.data(), doc.id);
//     })

onSnapshot(dataRef, (doc) => {
    console.log(doc.data(), doc.id);
})

// update a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: updateForm.title.value
    })
    .then(() =>{
        updateForm.reset()
    })

})


//sign user up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // console.log('user created: ', cred.user)
        signupForm.reset()
    })
    .catch((err) => {
        console.log(err.message)
    })
})

//logout
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', (e) => {
    e.preventDefault()
    signOut(auth)
    .then(() => {
        // console.log('User signed out');
    })
    .catch(() => {
        console.log(err.message);
    })
})

//login user
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // console.log('User logged in: ',  cred.user);
    })
    .catch((err) => {
        console.log(err.message);
    })
})

//subscribing to auth chnages
onAuthStateChanged(auth, (user) => {
    console.log('user status change: ', user);
})