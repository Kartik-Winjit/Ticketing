import { Publisher, Subjects, TicketCreatedEvent } from "@kgtix/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
