import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import CategoryView from "../views/categoryView.js";

const router = express.Router();

router.get("/categories", authMiddleware, CategoryView.getAll);
router.get("/categories/:id", authMiddleware, CategoryView.getById);
router.post("/categories", authMiddleware, CategoryView.create);
router.patch("/categories/:id", authMiddleware, CategoryView.update);
router.delete("/categories/:id", authMiddleware, CategoryView.delete);

export default router;
