import ExpenseView from './src/view/expense.js';
import express from 'express';

const app = express();
const PORT = 3000;
const expenseView = new ExpenseView();

app.use(express.json());
app.get('/expenses', expenseView.getAll);
app.get('/expense/:id', expenseView.getById);
app.post('/expense', expenseView.create);
app.put('/expense/:id', expenseView.update);
app.delete('/expense/:id', expenseView.delete);

app.listen(PORT, () => {
  console.log(`SERVIDOR RODANDO NA PORTA: http://localhost:${PORT}`);
});
