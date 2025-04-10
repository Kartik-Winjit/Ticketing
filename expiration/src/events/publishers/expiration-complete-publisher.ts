import { Subjects, Publisher, ExpirationCompleteEvent } from "@kgtix/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
