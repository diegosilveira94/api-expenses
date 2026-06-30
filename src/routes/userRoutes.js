import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import UserView from "../views/userView.js";

const router = express.Router();

router.post("/login", UserView.login);
router.post("/auth/login", UserView.login);
router.post("/users", UserView.create);
router.get("/users", authMiddleware, UserView.getAll);
router.get("/users/:id", authMiddleware, UserView.getById);
router.put("/users/:id", authMiddleware, UserView.update);
router.delete("/users/:id", authMiddleware, UserView.delete);

export default router;
