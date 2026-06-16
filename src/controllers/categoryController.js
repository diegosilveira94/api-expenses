import Category from "../models/categoryModel.js";

class CategoryController {
  static async create({ name, description }) {
    if (!name) {
      throw new Error("The name field is required.");
    }
    return await Category.createCategory({ name, description });
  }

  static async update({ id, name, description }) {
    return await Category.updateCategory({ id, name, description });
  }

  static async getAll() {
    return await Category.getAll();
  }

  static async getById(id) {
    return await Category.getById(id);
  }

  static async delete(id) {
    return await Category.deleteCategory(id);
  }
}

export default CategoryController;
