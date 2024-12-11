import { Router } from "express";
import reservationController from "../controllers/reservation";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { createReservationSchema } from "../validation/reservation";

const router = Router();

router.get("/", authorize({}), reservationController.getAll);

router.post(
  "/",
  authorize({}),
  validateSchema(createReservationSchema),
  reservationController.create
);

export default router;
