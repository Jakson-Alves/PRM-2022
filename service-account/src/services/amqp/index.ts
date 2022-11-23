import amqp, { Channel, Connection }from 'amqplib';

//Declarar um canal com o Rabbit
//Esse channel fica mudando, por isso o Let
let channel: Channel;

//Conecta no rabbit e devolve o canal utilizado para conectar
const connect = async () => {
    const conn: Connection = await amqp.connect('amqp://localhost');
    channel = await conn.createChannel();

}

//Conecta no rabbitMQ
connect()
    .then(() => {
        console.log('conectado ao rabbitMQ')
    })
    .catch(error => {
        console.log('Não foi possivel conectar a fila');
    })

//Envia ua mensagem a fila
const sendToQueue = async (message: string) => {
    await channel.assertQueue('prm-customer')
    return channel.sendToQueue('prm-customer', Buffer.from(message));
}

export {sendToQueue}