import { Router } from "express";
import rentController from "../controllers/rent";
import validateSchema from "../middlewares/validator";
import { getAllRentSchema } from "../validation/rent";
const router = Router();

router.get("/", validateSchema(getAllRentSchema), rentController.getAll);

export default router;
