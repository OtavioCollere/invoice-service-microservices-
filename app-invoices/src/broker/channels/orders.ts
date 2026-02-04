import { broker } from "../broker";

export const orders = await broker.createChannel();

await orders.assertQueue("orders")

