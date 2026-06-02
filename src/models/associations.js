import Expense from "./expenseModel.js";
import Category from "./categoryModel.js";

Category.hasMany(Expense, { foreignKey: "categoryId" });
Expense.belongsTo(Category, { foreignKey: "categoryId" });
