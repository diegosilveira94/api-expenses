import express from "express";
import { sequelize } from "./config/database.js";
import "./models/expenseModel.js";
import "./models/categoryModel.js";
import "./models/associations.js";
import ExpenseView from "./view/expenseView.js";
import CategoryView from "./view/categoryView.js";

await sequelize.sync({ alter: true });
console.info("Database synchronized.");

const PORT = 3000;

const app = express();

app.use(express.json());
app.get("/api/expenses", ExpenseView.getAll);
app.get("/api/categories", CategoryView.getAll);
app.get("/api/expenses/:id", ExpenseView.getById);
app.get("/api/categories/:id", CategoryView.getById);
app.post("/api/expenses", ExpenseView.create);
app.post("/api/categories", CategoryView.create);
app.put("/api/expenses/:id", ExpenseView.updateAll);
app.patch("/api/expenses/:id", ExpenseView.update);
app.delete("/api/expenses/:id", ExpenseView.delete);

const server = app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🤫`);
});

server.on("error", (error) => {
  console.error("There is an error", error.message);
});
