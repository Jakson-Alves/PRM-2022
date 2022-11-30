import * as admin from 'firebase-admin';

import { initializeApp, FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


import dotenv from 'dotenv';

const serviceAccount = require('./certs/service-account.json');


dotenv.config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};
//Inicialização do Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

initializeApp(firebaseConfig)

import { IUser } from "@typesCustom";

//Carregar variaveis de ambiente
dotenv.config();

//Atutenticação
const signInAdmin = (email: string, password: string) => (signInWithEmailAndPassword(getAuth(), email, password));

//Usuarios
const listUsers = () => admin.auth().listUsers(1000);

// const createUser = async (user: IUser) => {

//   const result = await admin.auth().createUser({
//       email: user.email,
//       emailVerified: true,
//       password: user.password,
//       displayName: user.name,
//       disabled: false
//       })
//       console.log(result);
      
//       admin.auth().setCustomUserClaims(result.uid, {admin: true});
//       //admin.auth().setCustomUserClaims(result.uid, {customer: !user.adm});
//       return result
//   };


// //usuario CLIENTES
// const createUserCustomer = async (user: IUser) => {
//   user.adm = false;
//   return createUser(user);
// }

// export const createUserAdmin =  async (user: IUser) => {
//   user.adm = true;
//   return createUser(user);
// }


const createUser = (user: IUser) => (admin.auth().createUser({
  email: user.email,
  emailVerified: true,
  password: user.password,
  displayName: user.name,
  disabled: false
}));

//Usuario Clientes
const createUserCustomer = async (user: IUser) => {

    //Aqui, estou retornando a função createUser, mas deve ser implentado 
    //diferente pela equipe, adicionando o retorno como Promise
    const result = await createUser(user);

    await admin.auth().setCustomUserClaims(result.uid, {customer: true});

    return new Promise(resolve => {
      resolve(result);
  });
} 

const getUser = (uid: string) => admin.auth().getUser(uid);
const updateUser = (uid: string, data: any) => admin.auth().updateUser(uid, data);
const deleteUser = (uid: string) => admin.auth().deleteUser(uid);

export { FirebaseError, signInAdmin, listUsers, createUser, getUser, updateUser, deleteUser, createUserCustomer }