import { Publisher, OrderCancelledEvent, Subjects } from "@kgtix/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.orderCancelled = Subjects.orderCancelled;
}
