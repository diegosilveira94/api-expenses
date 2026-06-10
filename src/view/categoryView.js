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
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async getAll(req, res) {
    const categories = await CategoryView.getAll();

    if (!categories) {
      res.status(404).send("There aren't any categories");
    }

    res.status(200).send(categories);
  }

  static async getById(req, res) {
    const id = req.params.id;
    const category = await CategoryView.getById(id);

    if (!id) {
      res.status(400).send("The id field is required.");
    }

    if (!category) {
      res.status(404).send("No category found.");
    }

    res.status(200).send(category);
  }
}
export default CategoryView;
