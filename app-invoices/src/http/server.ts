import '@opentelemetry/auto-instrumentations-node/register'
import '../broker/subscriber'

import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: "*" })

app.get("/health", () => {
  return { status: "ok" };
})

app.listen({ port: 3000 }).then(() => {
  console.log("[INVOICES] HTTP Server is running on port 3000");
});
 
