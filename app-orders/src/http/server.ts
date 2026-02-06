import '@opentelemetry/auto-instrumentations-node/register'
import { trace } from '@opentelemetry/api'

import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { z } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { channels } from "../broker/channels";
import { db } from "../db/client";
import { schema } from "../db/schema";
import { randomUUID } from "node:crypto";
import { dispatchOrderCreated } from "../broker/messages/order-created";
import { setTimeout } from 'node:timers/promises';
import { tracer } from '../tracer/tracer';

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: "*" })

app.get("/health", () => {
  return { status: "app orders is ok" };
})

app.post('/orders', {
  schema : {
    body: z.object({
      totalAmount: z.coerce.number(),
    })
  }
}, async (request, reply) => {
  const { totalAmount } = request.body;
  
  const orderId = randomUUID();
  const customerId = "ba46556e-5028-4550-b630-58403c04dec1";
  
  await db.insert(schema.orders).values({
    id: orderId,
    customerId,
    totalAmount,
  })

  
  const span = tracer.startSpan('b.o aqui')
  
  await setTimeout(1000, () => {})
  
  span.end()
  
  trace.getActiveSpan()?.setAttribute('order.id', orderId)

  dispatchOrderCreated({
    orderId,
    totalAmount,
    customer : {
      id : customerId
    }
  })

  return reply.status(201).send() 
})

app.listen({ port: 3333 }).then(() => {
  console.log("[ORDERS] HTTP Server is running on port 3333");
});
 
