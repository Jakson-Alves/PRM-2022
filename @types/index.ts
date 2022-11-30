export interface ICredential {
    email: string,
    password: string;
}

export interface IUser {
    //Interrogação diz que o atributo é opcuonal
    uid?: string;
    name: string;
    email: string;
    password?: string;
    adm?: boolean; 
}

export interface IBrand {
    id?: number;
    name: string;
}