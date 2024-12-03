import { Router } from "express";
import categoryController from "../controllers/category";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { categorySchema } from "../validation/category";

const router = Router();

router.get("/", categoryController.getAll);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(categorySchema),
  categoryController.create
);

router.put(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(categorySchema),
  categoryController.update
);

router.delete(
  "/:id",
  authorize({ isAdmin: true }),
  validateSchema(categorySchema),
  categoryController.remove
);

export default router;
