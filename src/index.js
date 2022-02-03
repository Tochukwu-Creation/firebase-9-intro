import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
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

  //retrieve collection data
  getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) =>{
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })

    .catch(err => {
        console.log(err.message);
    })