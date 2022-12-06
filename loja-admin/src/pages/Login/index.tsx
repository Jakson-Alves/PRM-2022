import { ICredential } from '@typesCustom';
import { MessageBar, MessageBarType, PrimaryButton, Spinner, SpinnerSize, Stack, TextField } from "@fluentui/react";
import { FormEvent, useState } from "react";
import { signInAdmin } from '../../services/server';
import { useAuth } from '../../hook/useAuth';

//Criando a página de Login
export function LoginPage(){

    const { user, signIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');

    //Inicia os objetos email e password
    const [credential, setCredential] = useState<ICredential>({
        email: '',
        password: ''
    }) 

    //Evento de credenciamento
    async function handleSignIn(event: FormDataEvent){
        event.preventDefault();

        setLoading(true);

        try {
            await signIn(credential);
        } catch (e) {
            setMessageError(String((e as Error).message));
        } finally {
            setLoading(false);
        }

        
    }   

    return (
        <div id="login-page">
            <Stack horizontal={false}>
                <form onSubmit={handleSignIn}>
                    {messageError && (
                        <MessageBar
                            delayedRender={false}
                            messageBarType={MessageBarType.error}
                            onDismiss={() => setMessageError('Usuário não Autorizado')}>
                            {messageError}
                        </MessageBar>
                    )}
                    {/* Caixa de E-mail */}
                    <TextField label="E-mail" 
                        required 
                        value={credential.email}
                        onChange={event => setCredential({...credential, email: (event.target as HTMLInputElement).value})}/>

                    {/* Caixa de Senha */}
                    <TextField label="Senha" 
                        required type="password"   
                        value={credential.password}
                        onChange={event => setCredential({...credential, password: (event.target as HTMLInputElement).value})}/>

                    {/* Botão Entrar */}
                    <PrimaryButton type="submit"
                        disabled={loading}>
                        {!loading ? (
                            <span>Entrar</span>
                        ) : (
                            <Spinner size={SpinnerSize.medium} />
                        )}
                    </PrimaryButton>
                </form>
           
                <h2> # {JSON.stringify(user)} #</h2>
            </Stack>
        </div>
    )
}