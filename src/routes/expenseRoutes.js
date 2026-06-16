import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import ExpenseView from "../views/expenseView.js";

const router = express.Router();

router.get("/expenses", authMiddleware, ExpenseView.getAll);
router.get("/expenses/:id", authMiddleware, ExpenseView.getById);
router.post("/expenses", authMiddleware, ExpenseView.create);
router.put("/expenses/:id", authMiddleware, ExpenseView.updateAllFields);
router.patch("/expenses/:id", authMiddleware, ExpenseView.update);
router.delete("/expenses/:id", authMiddleware, ExpenseView.delete);

export default router;
