import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where
} from 'firebase/firestore'
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

  //collection ref - get a specific sollection
  const colRef = collection(db, 'books')

  //queries
  const q = query(colRef, where("author", "==", "Sun zu"))

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
        author: addBookForm.author.value 
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