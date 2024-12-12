import { Router } from "express";
import reservationController from "../controllers/reservation";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import {
  changeStatusSchema,
  createReservationSchema,
} from "../validation/reservation";

const router = Router();

router.get("/", authorize({}), reservationController.getAll);

router.post(
  "/",
  authorize({}),
  validateSchema(createReservationSchema),
  reservationController.create
);

router.patch("/:id/cancel", authorize({}), reservationController.cancel);

router.patch(
  "/:id/change-status",
  authorize({ isAdmin: true }),
  validateSchema(changeStatusSchema),
  reservationController.changeStatus
);

export default router;
