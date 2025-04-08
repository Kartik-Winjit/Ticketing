import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireauth,
  validateRequest,
} from "@kgtix/common";
import { body } from "express-validator";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireauth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(order);
  }
);

export { router as showOrderRouter };
