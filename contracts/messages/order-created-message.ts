export interface OrderCreatedMessage{
  orderId : string
  totalAmount : number
  customer : {
    id : string
  }
}