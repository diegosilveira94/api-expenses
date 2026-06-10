import Expense from "./expenseModel.js";
import Category from "./categoryModel.js";
import User from "./userModel.js";

Category.hasMany(Expense, { foreignKey: "categoryId" });
Expense.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Category, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });