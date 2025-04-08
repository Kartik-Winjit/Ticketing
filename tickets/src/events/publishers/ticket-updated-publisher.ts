import { Publisher, Subjects, TicketUpdatedEvent } from "@kgtix/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
