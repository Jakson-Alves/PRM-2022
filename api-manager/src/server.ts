import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

//Carrego as variaveis de ambiente da aplicação
dotenv.config();

//Instancio uma aplicação express
const app = express();

//Determina a porta de execução
const PORT = process.env.PORT || 3300;

//Middleware
app.use(cors());

//Rotas do proxy
app.use('//backoffice', createProxyMiddleware({
    target: 'htpp://localhost:3301'
}))

app.use('/account', createProxyMiddleware({
    target: 'htpp://localhost:3302'
}))

    //Levanto a aplicação
app.listen(PORT, () => {
    console.log(`API Manager running in port ${PORT}`);
})