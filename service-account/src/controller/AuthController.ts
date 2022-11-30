import { FirebaseError } from 'firebase/app';
//import { ICredential } from '@typesCustom';
import {signInAdmin} from '../services/firebase';
import { IUser, ICredential} from '@typesCustom';


import { Request, Response } from 'express';

class AuthController {
    public async signInAdmin(request: Request, response: Response) {
        const  credential = request.body;
        
        try {
            
            const result = await signInAdmin(credential.email, credential.password);
            const idToken = await result.user.getIdTokenResult();
            const isCustomer = await idToken.claims.customer;

            if (isCustomer) {
                return response.status(403).json({message: 'Usuário náo autorizado'})
            }

            const user: IUser = {
                uid: result.user.uid,
                name: result.user.displayName || '',
                email: result.user.email || credential.email
            }

            const accessToken = await result.user.getIdToken();

            return response.json({user: user, token: accessToken})

        } catch (e) {
            const error = e as FirebaseError;

            //Bad request
            if (error.code === 'auth/missing-email') {
                return response.status(400).json({message: 'É preciso informar um e-mail.'});
            }

            //User not found
            if (error.code === 'auth/user-not-found') {
                return response.status(401).json({message: 'Usuário não encontrado.'});
            }

            //Password incorreta (wrong) 
            //401 -> não autorizado
            if (error.code === 'auth/wrong-password') {
                return response.status(401).json({message: 'A senha está incorreta.'});
            }

            return response.status(500).json(error.message);
        }
    }

    public async signInLoja(request: Request, response: Response) {
        const  credential = request.body;
        
        try {
            
            const result = await signInAdmin(credential.email, credential.password);
            const idToken = await result.user.getIdTokenResult();
            const isCustomer = await idToken.claims.customer;

            if (!isCustomer) {
                return response.status(403).json({message: 'Usuário náo autorizado'})
            }

            const user: IUser = {
                uid: result.user.uid,
                name: result.user.displayName || '',
                email: result.user.email || credential.email
            }

            const accessToken = await result.user.getIdToken();

            return response.json({user: user, token: accessToken})

        } catch (e) {
            const error = e as FirebaseError;

            //Bad request
            if (error.code === 'auth/missing-email') {
                return response.status(400).json({message: 'É preciso informar um e-mail.'});
            }

            //User not found
            if (error.code === 'auth/user-not-found') {
                return response.status(401).json({message: 'Usuário não encontrado.'});
            }

            //Password incorreta (wrong) 
            //401 -> não autorizado
            if (error.code === 'auth/wrong-password') {
                return response.status(401).json({message: 'A senha está incorreta.'});
            }

            //Password incorreta (wrong) 

            if (error.code === 'auth/not-authorized') {
                return response.status(403).json({message: 'Usuário não autorizado.'});
            }

            return response.status(500).json(error.message);
        }
    }
}

export default new AuthController();
