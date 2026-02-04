import { integer } from 'drizzle-orm/pg-core'
import { timestamp } from 'drizzle-orm/pg-core'
import { pgEnum } from 'drizzle-orm/pg-core'
import { text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { customers } from './customers'

export const orderStatusEnum = pgEnum("order_status", ["pending", "paid", "cancelled"])

export const orders = pgTable("orders", {
  id : text().primaryKey(),
  customerId : text().notNull().references(() => customers.id),
  totalAmount : integer().notNull(),
  status : orderStatusEnum().notNull().default("pending"),
  createdAt : timestamp().notNull().defaultNow()
})