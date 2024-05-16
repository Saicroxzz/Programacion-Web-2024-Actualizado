import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';

import { 
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  deleteUser
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9eKW1Tpg8E9vbQzabDKLbYunu9Jt8Tio",
  authDomain: "webotravez-c7e93.firebaseapp.com",
  projectId: "webotravez-c7e93",
  storageBucket: "webotravez-c7e93.appspot.com",
  messagingSenderId: "139806346957",
  appId: "1:139806346957:web:d154cdaca24c866f5f2384",
  measurementId: "G-3N8HQV2G6F"
};

import{
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js" 


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Google = new GoogleAuthProvider()
const Facebook = new FacebookAuthProvider()
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Metodos de servicios de autenticacion
//metodo de autenticacion de usuario
export const loginvalidation = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

  //cerrar sesion del usuario
export const loginout=()=>signOut(auth)

//estado del usuario logeado
export function userinfo(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
    } else {
      window.location.href = "../Templates/Index.html"
    }
  });
}

//Crear cuentas de authenticación
  export const registerauth=(email,password)=>
  createUserWithEmailAndPassword(auth, email, password)

  //inicio con Google
export const Gooogle = () => signInWithPopup(auth, Google)

//mensaje de confirmacion

export const confirmacion = () => sendEmailVerification(auth.currentUser)

//mensaje de cambio de contraseña

export const cambiar = (email) => sendPasswordResetEmail(auth, email)

//inicio sesion con Facebook

export const loginFacebook = () => signInWithPopup(auth, Facebook)
export const providerFacebook = new FacebookAuthProvider()

//eliminar usuario

export function Deletuser() {
  const user = auth.currentUser
  deleteUser(user)
    .then(() => {
      // User deleted.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    })
}

//Metodos database con firestore
export const addDataUser = (Id, name, Fecha, direccion, telefono, email, password) =>
  addDoc(collection(db, "users"), {
      Id,
      name,
      Fecha,
      direccion,
      telefono,
      email,
      password
  })

  //mostrar productos
export const AdminUser=()=>
  getDocs(collection(db, "users"));
