import ExpenseController from '../controller/expense.js';

class ExpenseView {
  constructor() {
    this.expenseController = new ExpenseController();
  }

  getAll = (req, res) => {
    try {
      const expenses = this.expenseController.getAll();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter a lista de despesas.' });
    }
  };

  getById = (req, res) => {
    try {
      const expense = this.expenseController.getById(Number(req.params.id));
      if (!expense) {
        res.status(404).send('Despesa não encontrada!');
        return;
      }
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter a despesa.' });
    }
  };

  create = (req, res) => {
    try {
      const { title, description, value } = req.body;

      if (!title || !description || !value) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
      }

      if (typeof value !== 'number') {
        res.status(400).json({ error: 'O valor deve ser um número.' });
        return;
      }

      const expense = this.expenseController.create(title, value, description);
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar a despesa.' });
    }
  };

  update = (req, res) => {
    try {
      const { title, description, value } = req.body;

      if (!title || !description || !value) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
      }

      if (typeof value !== 'number') {
        res.status(400).json({ error: 'O valor deve ser um número.' });
        return;
      }

      const expense = this.expenseController.update(
        Number(req.params.id),
        description,
        value,
      );

      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a despesa.' });
    }
  };

  delete = (req, res) => {
    try {
      this.expenseController.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir a despesa.' });
    }
  };
}

export default ExpenseView;
