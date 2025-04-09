import { Publisher, OrderCreatedEvent, Subjects } from "@kgtix/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
}
