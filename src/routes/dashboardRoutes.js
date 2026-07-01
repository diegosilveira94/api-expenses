import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import DashboardView from "../views/dashboardView.js";

const router = express.Router();

router.get(
  "/dashboard/total-expenses",
  authMiddleware,
  DashboardView.getTotalExpenses,
);
router.get(
  "/dashboard/expenses-count",
  authMiddleware,
  DashboardView.getExpensesCount,
);
router.get(
  "/dashboard/expenses-by-category",
  authMiddleware,
  DashboardView.getExpensesByCategory,
);

export default router;
