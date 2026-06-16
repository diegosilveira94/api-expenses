import CategoryController from "../controllers/categoryController.js";

class CategoryView {
  static async create(req, res) {
    const { name, description } = req.body;

    try {
      const category = await CategoryController.create({
        name,
        description,
      });

      res.status(201).send(category);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  static async getAll(req, res) {
    try {
      const categories = await CategoryView.getAll();

      if (!categories) {
        res.status(404).send("There aren't any categories");
        return;
      }

      res.status(200).send(categories);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  static async getById(req, res) {
    const id = req.params.id;

    try {
      const category = await CategoryView.getById(id);

      if (!category) {
        res.status(404).send("No category found.");
        return;
      }

      res.status(200).send(category);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const { name, description } = req.body;

    try {
      const category = await CategoryController.update(id, {
        name,
        description,
      });

      if (!category) {
        res.status(404).send("Category not found.");
        return;
      }

      res.status(200).send(category);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  static async delete(req, res) {
    const id = req.params.id;

    try {
      const category = await CategoryController.delete(id);

      if (!category) {
        res.status(404).send("Category not found.");
        return;
      }

      res.status(200).send("Category deleted successfully.");
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}

export default CategoryView;
