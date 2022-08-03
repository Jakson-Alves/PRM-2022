import express from 'express';

//instancio uma aplicação express
const app = express();

//Define qual porta de execução
const PORT = 3300;

app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`);
    console.log('teste');
})