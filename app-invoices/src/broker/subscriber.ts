import {orders} from "./channels/orders";

orders.consume('orders', async (message) => {

  if(!message) return;

  console.log(message.content.toString()) // vem como buffer

  orders.ack(message)
}, {
  noAck : false,
})