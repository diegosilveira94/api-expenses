import express from "express";
import { sequelize } from "./config/database.js";
import "./models/expenseModel.js";
import "./models/categoryModel.js";
import "./models/associations.js";
import ExpenseView from "./views/expenseView.js";
import CategoryView from "./views/categoryView.js";
import UserView from "./views/userView.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
app.use("/api", categoryRoutes);
app.use("/api", dashboardRoutes);

await sequelize.sync({ alter: true });
console.info("Database synchronized.");

const server = app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🤫`);
});

server.on("error", (error) => {
  console.error("There is an error", error.message);
});
