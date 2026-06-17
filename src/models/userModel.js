import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../config/database.js";

class User extends Model {
  static async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid password");
    }

    return user;
  }

  static async getAllUsers() {
    return await User.findAll();
  }

  static async createUser(email, password, name) {
    const user = new User({ email, password, name });
    return await user.save();
  }

  static async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async getUserById(id) {
    return await User.findByPk(id);
  }

  static async updateUser(id, email, password, name) {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }

    user.email = email;
    user.password = password;
    user.name = name;

    await user.save();
    return user;
  }

  static async deleteUser(id) {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }

    await user.destroy();
    return true;
  }

  static async getAll() { return await User.getAllUsers(); }
  static async create(email, password, name) { return await User.createUser(email, password, name); }
  static async getById(id) { return await User.getUserById(id); }
  static async update(id, email, password, name) { return await User.updateUser(id, email, password, name); }
  static async delete(id) { return await User.deleteUser(id); }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  },
);

export default User;
