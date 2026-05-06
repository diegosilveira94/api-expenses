import express from "express";
import ExpenseView from "./view/expenseView.js";
// import expenseRoutes from './routes/expenseRoutes.js'

const PORT = 3000;

const app = express();

app.use(express.json());
app.get("/api/expenses", ExpenseView.getAll);
app.get("/api/expenses/:id", ExpenseView.getById);
app.post("/api/expenses", ExpenseView.create);
app.put("/api/expenses/:id", ExpenseView.updateAll);
app.patch("/api/expenses/:id", ExpenseView.update);
app.delete("/api/expenses/:id", ExpenseView.delete);

app.listen(PORT, (error) => {
  if (error) {
    console.log("There is an error");
    return;
  }
  console.log(`Server running in http://localhost:${PORT} 🤫`);
});
