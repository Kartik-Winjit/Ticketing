import express, { Request, Response } from "express";
import { requireauth, validateRequest } from "@kgtix/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
const router = express.Router();

router.post(
  "/api/tickets",
  requireauth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      userId: ticket.title,
      price: ticket.price,
      version: ticket.version,
    });
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
