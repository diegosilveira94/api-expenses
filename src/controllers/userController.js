import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authConfig from "../config/auth.js";

class UserController {
  static mapUser(user) {
    const { password, ...safe } = user.dataValues || user;

    return safe;
  }

  static mapPublicUser(user) {
    const { id, email, name } = UserController.mapUser(user);

    return { id, email, name };
  }

  static async getAll() {
    return (await User.getAllUsers()).map((u) => UserController.mapUser(u));
  }

  static async create(email, password, name) {
    if (password.length < 6) {
      throw new Error("The password must contain at least 6 characters");
    }

    const user = await User.createUser(email, password, name);
    return UserController.mapUser(user);
  }

  static async login(email, password) {
    const user = await User.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn },
    );

    return {
      token,
      user: UserController.mapPublicUser(user),
    };
  }

  static async getById(id) {
    const user = await User.getUserById(id);

    return UserController.mapUser(user);
  }

  static async update(id, email, password, name) {
    if (password.length < 6) {
      throw new Error("Password must contain at least 6 characters");
    }

    if (email.length < 5 || !email.includes("@")) {
      throw new Error(
        'Email must contain at least 5 characters and include an "@"',
      );
    }

    const user = await User.updateUser(id, email, password, name);

    return UserController.mapUser(user);
  }

  static async delete(id) {
    return await User.deleteUser(id);
  }
}

export default UserController;
