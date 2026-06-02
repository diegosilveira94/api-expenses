import Category from "../models/categoryModel.js";

class CategoryController {
  static async create({ name, description }) {
    return await Category.createCategory({ name, description });
  }

  static async update({ id, name, description }) {
    return await Category.updateCategory({ id, name, description });
  }
}

export default CategoryController;
